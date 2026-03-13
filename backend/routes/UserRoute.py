from fastapi import APIRouter
from fastapi.params import Depends
from schemas.UserSchema import User
from security.Auth import get_current_user

user_route = APIRouter(prefix="/user", tags=["user"])

@user_route.post("/me")
async def get_me(current_user: User =  Depends(get_current_user)) :
    return current_user

