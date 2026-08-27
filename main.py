from fastapi import FastAPI, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from database import engine, SessionLocal
import models.user_model as user_model
import models.message_model as message_model
import schemas
import security
from fastapi.security import OAuth2PasswordRequestForm
import jwt
from jwt.exceptions import InvalidTokenError
from tasks import send_email_task
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone

user_model.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://smart-email-scheduler-eight.vercel.app",
                   "http://localhost:5173",
                ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
        
    if token.startswith("Bearer "):
        token = token.split(" ")[1]
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
            
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    user = db.query(user_model.User).filter(user_model.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
        
    return user


@app.get("/")
def show():
    return "Welcome to Server"


## Sign-Up Route
@app.post("/signup", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")

    hashed_pwd = security.get_psw_hash(user.password)

    new_user = user_model.User(name=user.name, email=user.email, hashed_password=hashed_pwd)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # for id generated

    return new_user


## login Route
@app.post("/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    db_user = db.query(user_model.User).filter(user_model.User.email == form_data.username).first()
    
    if not db_user or not security.verify_psw(form_data.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = security.create_access_token(data={"sub": db_user.email})

    response.set_cookie(
        key="access_token", 
        value=f"Bearer {access_token}", 
        httponly=True, 
        samesite="lax",
        max_age=1800 # 30 minutes
    )

    return {"message": "Login Successful!"}


## Schedule Email Route
@app.post("/schedule")
def schedul_email(
    message: schemas.MessageCreate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):

    new_msg = message_model.Message(
        to_email=message.to_email,
        subject=message.subject,
        body=message.body,
        send_time=message.send_time,
        status="Pending",  
        owner_id=current_user.id 
    )
 
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)  

    send_email_task.apply_async(
        args=[new_msg.to_email, new_msg.subject, new_msg.body],
        eta=message.send_time
    ) 

    return {"message": "Email Successfully saved to database as Pending!", "message_id": new_msg.id}


## Logout Route
@app.post("/logout")
def logout(response: Response):
    # This deletes the HTTP-only cookie from the user's browser
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax"
    )
    return {"message": "Successfully logged out"}


## Verify Session 
@app.get("/verify-session")
def verify_session(current_user: user_model.User = Depends(get_current_user)):
    return {
        "name": current_user.name,
        "email": current_user.email
    }


## For Inbox
@app.get("/inbox")
def get_inbox(
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    messages = db.query(message_model.Message).filter(
        message_model.Message.to_email == current_user.email
    ).order_by(message_model.Message.id.desc()).all()
    
    all_users = db.query(user_model.User).all()
    user_email_map = {user.id: user.email for user in all_users}
    
    inbox_emails = []
    for msg in messages:
        sender_email = user_email_map.get(msg.owner_id, "Unknown")
        
        inbox_emails.append({
            "id": msg.id,
            "to_email": msg.to_email,
            "from_email": sender_email,
            "subject": msg.subject,
            "body": msg.body,
            "send_time": msg.send_time
        })
        
    return inbox_emails


## Stored mail in Scheduled Mail
@app.get("/scheduled")
def get_scheduled(
    current_user: user_model.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # FIXED: Using message_model.Message.owner_id instead of user_id
    messages = db.query(message_model.Message).filter(
        message_model.Message.owner_id == current_user.id
    ).order_by(message_model.Message.id.desc()).all()
    
    scheduled_emails = []
    for msg in messages:
        scheduled_emails.append({
            "id": msg.id,
            "to_email": msg.to_email,
            "from_email": current_user.email,
            "subject": msg.subject,
            "body": msg.body,
            "send_time": msg.send_time
        })
        
    return scheduled_emails