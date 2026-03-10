from fastapi import FastAPI, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session

from config.db import get_db
from repository.UserRepository import UserRepository

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/users")
async def get_users(db: Session = Depends(get_db)):
    try:
        users = UserRepository(db).list_users()
        return users
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))