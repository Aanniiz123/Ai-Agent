from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


MessageRole = Literal["assistant", "user"]


class ConversationBase(BaseModel):
    title: str = Field(default="New chat", min_length=1, max_length=255)


class ConversationCreate(ConversationBase):
    pass


class ConversationUpdate(ConversationBase):
    pass


class ConversationResponse(ConversationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    created_at: datetime


class MessageBase(BaseModel):
    content: str = Field(min_length=1)
    role: MessageRole


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    conversation_id: int
    created_at: datetime