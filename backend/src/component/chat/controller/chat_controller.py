from fastapi import Depends, Response, status
from sqlalchemy.orm import Session

from src.component.auth.controller.auth_controller import get_me
from src.component.auth.models.models import User
from src.component.chat.models.scheme import (
    ConversationCreate,
    ConversationResponse,
    ConversationUpdate,
    MessageCreate,
    MessageResponse,
)
from src.component.chat.services import chat_service
from src.database.database import get_db


## Add the conversation to the database
def create_conversation(
    conversation_create: ConversationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me)) -> ConversationResponse: ## Returns on the conResponse
    
    return chat_service.create_conversation(
        db, user_id=current_user.id, title=conversation_create.title)


def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> list[ConversationResponse]:
    return chat_service.list_conversations(db, user_id=current_user.id)


def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> ConversationResponse:
    return chat_service.get_conversation(
        db, user_id=current_user.id, conversation_id=conversation_id
    )


def update_conversation(
    conversation_id: int,
    conversation_update: ConversationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> ConversationResponse:
    return chat_service.update_conversation(
        db,
        user_id=current_user.id,
        conversation_id=conversation_id,
        title=conversation_update.title,
    )


def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> Response:
    chat_service.delete_conversation(
        db, user_id=current_user.id, conversation_id=conversation_id
    )
    return Response(status_code=status.HTTP_204_NO_CONTENT)

def save_message(
    conversation_id: int,
    message: MessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> MessageResponse:
    return chat_service.save_message(
        db,
        user_id=current_user.id,
        conversation_id=conversation_id,
        role=message.role,
        content=message.content,
    )


def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_me),
) -> list[MessageResponse]:
    return chat_service.get_messages(
        db, user_id=current_user.id, conversation_id=conversation_id
    )