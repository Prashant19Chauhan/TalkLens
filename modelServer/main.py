from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Hello, FastAPI is running!"}

@app.get("/greet/{name}")
def greet(name: str):
    return {"message": f"Hello, {name}!"}