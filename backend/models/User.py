import uuid

from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship

from models.Base import Base



class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True,default=uuid.uuid4)
    username: Mapped[str] = mapped_column(String)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)


    blobs: Mapped[list["Blob"]] = relationship(back_populates="user")
    vaults: Mapped[list["Vault"]] = relationship(back_populates="user")