from pydantic import BaseModel
from typing import List

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserBase(BaseModel):
    username: str
    email: str | None = None

    class Config:
        orm_mode = True

class AddUser(BaseModel):
    username: str
    email: str
    password: str

class UserData(UserBase):
    hashed_password: str

class ProductBase(BaseModel):
    name: str
    price: float
    quantity: int

    class Config:
        orm_mode = True

class ProductAddRequest(BaseModel):
    name: str
    price: float
    quantity: int
