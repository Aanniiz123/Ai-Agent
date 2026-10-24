from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

load_dotenv(Path(__file__).resolve().parent / ".env")

import src.core.config  # starts Firebase Admin
from src.component.auth.router.auth_router import router as auth_router
from src.database.database import get_db
import os 
from redis_fastapi import FastAPIRedis

## For chat 
from src.component.chat.router.chat_router import router as chat_router

app = FastAPI()

FastAPIRedis(app).lifespan().sessions(
    principal_keys=["user_id"],
)

load_dotenv()

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
).rstrip("/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"App is running"}

app.include_router(auth_router)
app.include_router(chat_router)

@app.get("/db")
def check_db_connection(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail={"status": "error", "database": "disconnected", "error": str(e)},
        )
