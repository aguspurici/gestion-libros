from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from db import get_db
import models, schemas, auth
from auth import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.post("/register", response_model=schemas.UsuarioResponse, status_code=201)
def registrar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    # nos fijamos si el mail ya esta en la base de datos
    db_usuario = db.query(models.UsuarioModel).filter(models.UsuarioModel.email == usuario.email).first()
    if db_usuario:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="el email ya esta registrado"
        )

    # encriptamos la contraseña para no guardarla en texto plano
    hashed_pass = auth.hash_password(usuario.password)

    # creamos el nuevo usuario con el mail en minusculas
    nuevo_usuario = models.UsuarioModel(
        nombre=usuario.nombre,
        email=usuario.email.lower(),
        password_hash=hashed_pass
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


@router.post("/login", response_model=schemas.LoginResponse)
def login(credenciales: schemas.UsuarioLogin, db: Session = Depends(get_db)):
    # buscamos al usuario por su mail
    usuario = db.query(models.UsuarioModel).filter(models.UsuarioModel.email == credenciales.email.lower()).first()

    # verificamos que el usuario exista y que la contraseña sea la correcta
    if not usuario or not auth.verify_password(credenciales.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="email o contraseña incorrectos"
        )
    
    # generamos el token de acceso con el id del usuario
    token_data = {"sub": str(usuario.id)}
    token = create_access_token(token_data)

    # devolvemos el token y la info basica del usuario
    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "email": usuario.email
        }
    }






@router.post("/token")
def login_oauth(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # este endpoint es para que funcione la documentacion de swagger
    usuario = db.query(models.UsuarioModel)\
        .filter(models.UsuarioModel.email == form_data.username.lower())\
        .first()

    if not usuario or not auth.verify_password(
        form_data.password,
        usuario.password_hash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="credenciales incorrectas"
        )

    token = create_access_token({"sub": str(usuario.id)})

    return {
        "access_token": token,
        "token_type": "bearer"
    }