from fastapi import FastAPI, HTTPException
from routes.AuthRoute import auth_router
from routes.UserRoute import user_router

app = FastAPI()
app.include_router(user_router)
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


