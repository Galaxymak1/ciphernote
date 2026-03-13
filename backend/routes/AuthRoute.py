from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from config.db import get_db
from dto.AuthDto import LoginDto
from schemas.AuthSchema import Token, RegisterRequest
from security.Auth import get_current_user
from service.AuthService import AuthService

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/login")
async def login(request : LoginDto,db = Depends(get_db)) -> Token:
    token = AuthService().login(db = db, email=request.email, password=request.password)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Incorrect email or password")
    return token

@auth_router.post("/register")
async def register(request: RegisterRequest,db = Depends(get_db)):
