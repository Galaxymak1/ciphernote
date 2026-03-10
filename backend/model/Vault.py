from sqlalchemy import String, Integer, ForeignKey, BINARY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from model.Base import Base


class Vault(Base):
    __tablename__ = 'vaults'
    id : Mapped[str] = mapped_column(String,nullable=False,primary_key=True)
    wrapped_key: Mapped[bytes] = mapped_column(BINARY,nullable=False)
    iv: Mapped[bytes] = mapped_column(BINARY,nullable=False)
    salt: Mapped[bytes] = mapped_column(BINARY,nullable=False)
    iterations: Mapped[int] = mapped_column(Integer,nullable=False)

    user_id : Mapped[int] = mapped_column(ForeignKey('users.id'))
    user : Mapped["User"] = relationship(back_populates="vaults")