from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

PUBLIC_PATHS = {
    "/",
    "/db",
    "/docs",
    "/redoc",
    "/openapi.json",
    "/auth/",
    "/auth/google-login",
}


class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS" or request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        return await call_next(request)
