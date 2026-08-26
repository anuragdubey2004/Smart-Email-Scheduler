from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    to_email = Column(String, index=True)
    subject = Column(String)
    body = Column(Text)
    send_time = Column(DateTime)
    status = Column(String, default="Pending")
    
    owner_id = Column(Integer, ForeignKey("users.id"))