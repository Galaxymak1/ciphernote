
from sqlalchemy import String, Integer, BINARY, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship

from models.Base import Base


class Blob(Base):
    __tablename__ = 'blobs'
    id : Mapped[str] = mapped_column(String, primary_key=True)
    updated_at: Mapped[int] = mapped_column(Integer)
    expires_at: Mapped[int] = mapped_column(Integer)
    ciphertext: Mapped[bytes] = mapped_column(BINARY,nullable=False)
    iv: Mapped[bytes] = mapped_column(BINARY,nullable=False)
    type: Mapped[str] = mapped_column(String,nullable=False)
    name: Mapped[str] = mapped_column(String,nullable=False)

    user_id : Mapped[int] = mapped_column(ForeignKey('users.id'),index=True)

    user: Mapped["User"] = relationship(back_populates='blobs')

    __table_args__ = (
        Index("blobs_user_updated_idx", "user_id", "updated_at"),
    )

