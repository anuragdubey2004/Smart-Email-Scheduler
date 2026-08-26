from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, timezone


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    is_active: bool

    class config:
        from_attributes: True 


class MessageCreate(BaseModel):
    to_email: EmailStr
    subject: str
    body: str
    send_time: datetime

    @field_validator('send_time')
    def check_future_date(cls, value):
        curr_time = datetime.now(timezone.utc)
        if value < curr_time:
            raise ValueError("Send time must be in future")
        return value