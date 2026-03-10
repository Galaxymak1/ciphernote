from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped, relationship

from model.Base import Base



class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)


    blobs: Mapped[list["Blob"]] = relationship(back_populates="user")
    vaults: Mapped[list["Vault"]] = relationship(back_populates="user")