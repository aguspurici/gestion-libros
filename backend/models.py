from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from db import Base


class UsuarioModel(Base):
    # nombre de la tabla en la base de datos
    __tablename__ = "usuarios"

    # columnas para la info del usuario
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)

    # relacion para acceder a los libros del usuario y borrar todo en cascada
    libros = relationship(
        "LibroModel",
        back_populates="propietario",
        cascade="all, delete"
    )


class LibroModel(Base):
    # nombre de la tabla de libros
    __tablename__ = "libros"

    # datos principales de cada libro
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    descripcion = Column(String, nullable=False)
    
    # clave foranea para saber a que usuario le pertenece el libro
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    # relacion para volver al modelo de usuario
    propietario = relationship("UsuarioModel", back_populates="libros")

    # restriccion para que un mismo usuario no repita nombres de libros
    __table_args__ = (
        UniqueConstraint('nombre', 'usuario_id', name='_nombre_usuario_uc'),
    )