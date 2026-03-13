from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.AuthSchema import Token
from repository.UserRepository import UserRepository
from security.JwtUtils import create_access_token
from security.PasswordUtils import verify_password


class AuthService:
    def __init__(self):
        pass

    def login(self,db : Session,email,password) -> Token:
        user = UserRepository(db).find_by_email(email)
        if not user:
            raise HTTPException(status_code=404,detail="User not found")

        if not verify_password(password,user.password):
            raise HTTPException(status_code=404,detail="Incorrect password")

        token = create_access_token({"user_id":user.id,"username":user.username})

        return Token(access_token=token,token_type="bearer")