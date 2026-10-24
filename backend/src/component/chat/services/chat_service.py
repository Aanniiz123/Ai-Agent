from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from src.component.chat.models.models import Conversation, Message


def create_conversation(db: Session, user_id: int, title: str) -> Conversation:
    conversation = Conversation(user_id=user_id, title=title)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def list_conversations(db: Session, user_id: int) -> list[Conversation]:
    return (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )


def get_conversation(db: Session, user_id: int, conversation_id: int) -> Conversation:
    # Filtering by user_id guarantees users can only see their own conversations
    conversation = (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id, Conversation.user_id == user_id)
        .first()
    )
    if conversation is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Conversation not found")
    return conversation


def update_conversation(
    db: Session, user_id: int, conversation_id: int, title: str
) -> Conversation:
    conversation = get_conversation(db, user_id, conversation_id)
    conversation.title = title
    db.commit()
    db.refresh(conversation)
    return conversation


def delete_conversation(db: Session, user_id: int, conversation_id: int) -> None:
    conversation = get_conversation(db, user_id, conversation_id)
    db.delete(conversation)
    db.commit()


def save_message(
    db: Session, user_id: int, conversation_id: int, role: str, content: str
) -> Message:
    get_conversation(db, user_id, conversation_id)
    message = Message(conversation_id=conversation_id, role=role, content=content)
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def get_messages(db: Session, user_id: int, conversation_id: int) -> list[Message]:
    get_conversation(db, user_id, conversation_id)  # ownership check
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at.asc(), Message.id.asc())
        .all()
    )