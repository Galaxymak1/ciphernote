from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str = None
    email: str = None

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str