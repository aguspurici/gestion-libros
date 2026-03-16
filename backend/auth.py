import os
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from dotenv import load_dotenv

# cargamos variables del .env
load_dotenv()

# configuracion para la firma y duracion del token
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# funcion para generar el token jwt con tiempo de expiracion
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# configuracion del motor para encriptar contraseñas
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")




# funcion para transformar la contraseña en un hash seguro
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# funcion para comparar la contraseña ingresada con el hash guardado
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)