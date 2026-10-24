from fastapi import APIRouter
from src.component.chat.controller.chat_controller import(
    create_conversation,
    delete_conversation,
    get_conversation,
    get_messages,
    list_conversations,
    save_message,
    update_conversation,

)

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/")
def check():
    return {"message": "Welcome to the chat"}


# Conversations
router.add_api_route("/conversations", create_conversation, methods=["POST"], status_code=201)
router.add_api_route("/conversations", list_conversations, methods=["GET"])
router.add_api_route("/conversations/{conversation_id}", get_conversation, methods=["GET"])
router.add_api_route("/conversations/{conversation_id}", update_conversation, methods=["PUT"])
router.add_api_route("/conversations/{conversation_id}", delete_conversation, methods=["DELETE"], status_code=204)


## messages
router.add_api_route("/conversations/{conversation_id}/messages", save_message, methods=["POST"], status_code=201)
router.add_api_route("/conversations/{conversation_id}/messages", get_messages, methods=["GET"])