from fastapi import Response, status, HTTPException, Depends, Header
from firebase_admin import auth
from fastapi.concurrency import run_in_threadpool
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from redis_fastapi import SessionDep

from src.database.database import get_db
from src.component.auth.models.models import User
from src.component.auth.models.schemas import UserResponse

SESSION_COOKIE_NAME = "session"


def _get_or_create_user(
    db: Session,
    firebase_uid: str,
    email: str | None,
    name: str,
    avatar: str | None,
) -> User:
    user = db.execute(select(User).where(User.firebase_uid == firebase_uid)).scalar_one_or_none()

    if user:
        return user

    if not email:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email required")

    user = User(firebase_uid=firebase_uid, email=email, name=name, avatar=avatar)

    db.add(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        user = db.execute(select(User).where(User.firebase_uid == firebase_uid)).scalar_one()
    else:
        db.refresh(user)
    return user


def _user_from_session(db: Session, session: dict) -> User:
    user_id = session.get("user_id")
    if not user_id:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Not logged in")

    try:
        parsed_id = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid session")

    user = db.execute(select(User).where(User.id == parsed_id)).scalar_one_or_none()
    if not user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "User not found")
    return user


async def google_login(
    session: SessionDep,
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Missing or invalid Authorization header")

    id_token = authorization.split(" ", 1)[1].strip()

    try:
        decoded = await run_in_threadpool(auth.verify_id_token, id_token)
    except (auth.InvalidIdTokenError, auth.ExpiredIdTokenError, auth.RevokedIdTokenError, ValueError):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid token")

    user = await run_in_threadpool(
        _get_or_create_user,
        db,
        decoded["uid"],
        decoded.get("email"),
        decoded.get("name") or "User",
        decoded.get("picture"),
    )

    session["user_id"] = str(user.id)
    return UserResponse.model_validate(user)


async def get_me(session: SessionDep, db: Session = Depends(get_db)):
    user = _user_from_session(db, session)
    return UserResponse.model_validate(user)


async def google_logout(response: Response, session: SessionDep):
    session.clear()
    response.delete_cookie(SESSION_COOKIE_NAME)
    return {"detail": "Logged out"}
