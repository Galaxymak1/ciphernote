from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session

from config.db import get_db
from repository.UserRepository import UserRepository
from schemas.UserSchema import User
from security.Auth import get_current_user

user_router = APIRouter(prefix="/user", tags=["user"])

@user_router.post("/me")
async def get_me(current_user: User =  Depends(get_current_user)) :
    return current_user

@user_router.get("/users")
async def get_users(db: Session = Depends(get_db)):
    try:
        users = UserRepository(db).list_users()
        return users
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
