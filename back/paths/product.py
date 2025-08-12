from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from back.schemas import ProductBase, ProductAddRequest, UserBase
from back.models import Product
from back.auth.handler import get_product, get_current_user
from back.database import get_db
import logging

router = APIRouter()

logger = logging.getLogger("uvicorn.error")
logger.setLevel(logging.DEBUG)

@router.post("/product/add")
def add_product(product: ProductAddRequest, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    db_product = get_product(db, product.name)
    if db_product:
        raise HTTPException(
            status_code=400,
            detail="Product already exists",
            headers={"WWW-Authenticate": "Bearer"},
        )
    db_product = Product(name=str(product.name), price=float(product.price), quantity=int(product.quantity))
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/products", response_model=List[ProductBase])
def get_products(db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    return db.query(Product).all()

@router.delete("/product/delete")
def delete_product(name: str, db: Session = Depends(get_db), current_user: str = Depends(get_current_user)):
    db_product = get_product(db, name)
    if db_product:
        db.delete(db_product)
        db.commit()
        return {"detail": "Product deleted"}
    raise HTTPException(status_code=404, detail=f"{name} not found")

