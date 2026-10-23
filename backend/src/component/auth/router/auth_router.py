from fastapi import APIRouter

from src.component.auth.controller.auth_controller import (
    get_me,
    google_login,
    google_logout,
)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.get("/")
def check():
    return {"message": "Welcome to the auth"}


router.add_api_route("/google-login", google_login, methods=["POST"], status_code=200)
router.add_api_route("/me", get_me, methods=["GET"], status_code=200)
router.add_api_route("/logout", google_logout, methods=["POST"], status_code=200)
