from typing import Any

from sqlalchemy import select
from sqlalchemy.dialects.sqlite import insert
from sqlalchemy.orm import Session

from model.Blob import Blob


class BlobRepository:
    def __init__(self,db : Session):
        self.db = db


    def get_all_by_id_and_updated_at(self, since: int, user_id: int):
        stmt = (
            select(Blob)
            .where(
                Blob.user_id == user_id,
                Blob.updated_at > since
            )
            .order_by(Blob.updated_at.desc())
        )

        return self.db.scalars(stmt).all()

    async def add_blob(self, blob: dict, user_id: int):
        """
        blob: dict with keys id, ciphertext (bytes), iv (bytes), updatedAt (int),
              expiresAt (int, optional), name (str), type (str)
        """

        stmt = insert(Blob).values(
            id=blob["id"],
            ciphertext=blob["ciphertext"],
            iv=blob["iv"],
            updatedAt=blob["updatedAt"],
            expiresAt=blob.get("expiresAt"),
            name=blob["name"],
            type=blob["type"],
            user_id=user_id
        ).on_conflict_do_update(
            index_elements=[Blob.id],
            set_={
                "ciphertext": insert(Blob).excluded.ciphertext,
                "iv": insert(Blob).excluded.iv,
                "updatedAt": insert(Blob).excluded.updatedAt,
                "expiresAt": insert(Blob).excluded.expiresAt,
                "name": insert(Blob).excluded.name,
                "type": insert(Blob).excluded.type,
            },
            where=insert(Blob).excluded.updatedAt > Blob.updatedAt
        )

        self.db.execute(stmt)
        self.db.commit()