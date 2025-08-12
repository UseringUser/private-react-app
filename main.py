import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from back.paths.auth import router as auth_router
from back.paths.user import router as user_router
from back.paths.product import router as product_router

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router)
app.include_router(auth_router, prefix="/auth")
app.include_router(product_router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)