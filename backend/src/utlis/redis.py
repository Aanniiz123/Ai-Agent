from redis_fastapi import AsyncRedisDep
from src.component.auth.router.auth_router import router

@router.get("/ping")
async def ping_redis(r :AsyncRedisDep):
    return {"pong": await r.ping()}