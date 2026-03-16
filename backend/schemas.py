from pydantic import BaseModel, Field, EmailStr
from typing import List



#  USUARIOS


# esquema para validar los datos al registrarse
class UsuarioCreate(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)


# esquema para validar las credenciales al iniciar sesion
class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=100)


# como se devuelve la info del usuario (sin la password)
class UsuarioResponse(BaseModel):
    id: int
    nombre: str
    email: EmailStr

    model_config = {
        "from_attributes": True # permite leer modelos de sqlalchemy directamente
    }

# estructura de la respuesta al loguearse con éxito
class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    usuario: UsuarioResponse


# LIBROS


# validaciones para cuando se crea o edita un libro
class LibroCreate(BaseModel):
    nombre: str = Field(..., min_length=2, max_length=100)
    autor: str = Field(..., min_length=2, max_length=100)
    descripcion: str = Field(..., min_length=5, max_length=500)


# datos que devuelve la api cuando pedis un libro
class LibroResponse(LibroCreate):
    id: int
    usuario_id: int
    
    model_config = {
        "from_attributes": True
    }

# esquema para manejar la lista de libros con paginacion
class LibroPaginadoResponse(BaseModel):
    total: int                  # cantidad total de libros del usuario
    libros: List[LibroResponse]  # los libros que corresponden a la pagina actual
    skip: int
    limit: int