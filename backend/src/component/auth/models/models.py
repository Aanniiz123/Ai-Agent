
from sqlalchemy import Integer, Column, String, DateTime, func
from src.database.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key= True, index= True)
    name = Column(String(100), nullable= False)
    firebase_uid = Column(String(130), unique= True, index= True, nullable=False)
    email = Column(String(255), unique=True, index= True, nullable= False)
    avatar = Column(String(500), nullable= True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


