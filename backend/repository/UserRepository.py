from typing import List, Any

from sqlalchemy.orm import Session

from model.User import User
from security.PasswordUtils import hash_password


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def list_users(self) -> list[type[User]]:
        users = self.db.query(User).all()
        return users

    def find_by_email(self,email: str) -> type[User] | None:
        user = self.db.query(User).filter(User.email == email).first()
        return user

    def create(self,
               email: str,
               password: str,
               ):
        hashed_password = hash_password(password)
        self.db.add(User(email=email,password=hashed_password))