from fastapi import APIRouter, Depends, HTTPException

from back.schemas import UserBase
from back.auth.handler import get_current_user, get_user, get_password_hash

router = APIRouter()

@router.get("/users/current", response_model=UserBase)
async def get_current_user(current_user: UserBase = Depends(get_current_user)):
    return current_user



