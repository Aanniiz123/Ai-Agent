from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, ConfigDict



class UserBase(BaseModel):
    name: str
    email: EmailStr
    avatar: Optional[str] = None


class UserCreate(UserBase):
    firebase_uid: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    firebase_uid: str
    created_at: datetime