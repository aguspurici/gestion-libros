from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from db import get_db
import models, schemas, auth

router = APIRouter(prefix="/libros", tags=["Libros"])

# configuracion para manejar el token de seguridad
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="usuarios/token")

# funcion para sacar el id del usuario desde el token
def get_current_user_id(token: str = Depends(oauth2_scheme)):
    try:
        # decodificamos el token con la clave secreta
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="token invalido")
        return int(user_id)
    except JWTError:
        raise HTTPException(status_code=401, detail="no se pudo validar la sesion")
    

@router.post("/", response_model=schemas.LibroResponse, status_code=201)
def crear_libro(
    libro: schemas.LibroCreate,
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    # limpiar y formatear el texto antes de guardar
    nombre_formateado = libro.nombre.strip().title()      
    autor_formateado = libro.autor.strip().title()         
    descripcion_formateada = libro.descripcion.strip().capitalize()  

    # revisar si el usuario ya tiene un libro con ese mismo nombre
    libro_existente = db.query(models.LibroModel).filter(
        models.LibroModel.nombre.ilike(nombre_formateado),
        models.LibroModel.usuario_id == current_user_id
    ).first()

    if libro_existente:
        raise HTTPException(
            status_code=400,
            detail="ya tienes un libro registrado con este nombre"
        )
    
    # crear el registro en la base de datos
    nuevo_libro = models.LibroModel(
        nombre=nombre_formateado,
        autor=autor_formateado,
        descripcion=descripcion_formateada,
        usuario_id=current_user_id
    )

    db.add(nuevo_libro)
    db.commit()
    db.refresh(nuevo_libro)

    return nuevo_libro
 
@router.get("/", response_model=schemas.LibroPaginadoResponse)
def obtener_mis_libros(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, le=100),
    db: Session = Depends(get_db),
    current_user_id: int = Depends(get_current_user_id)
):
    # buscar solo los libros que le pertenecen al usuario logueado
    query_base = db.query(models.LibroModel).filter(models.LibroModel.usuario_id == current_user_id)

    total_libros = query_base.count()
    
    # aplicar paginacion para no traer todos de golpe
    libros = query_base.offset(skip).limit(limit).all()
    
    return {
        "total": total_libros,
        "libros": libros,
        "skip": skip,
        "limit": limit
    }


@router.put("/{book_id}", response_model=schemas.LibroResponse)
def actualizar_libro(
    book_id: int, 
    libro_editado: schemas.LibroCreate, 
    db: Session = Depends(get_db), 
    current_user_id: int = Depends(get_current_user_id)
):
    # buscar el libro por id y dueño
    db_libro = db.query(models.LibroModel).filter(
        models.LibroModel.id == book_id, 
        models.LibroModel.usuario_id == current_user_id
    ).first()

    if not db_libro:
        raise HTTPException(status_code=404, detail="libro no encontrado")

    # formatear los datos nuevos
    nombre_nuevo = libro_editado.nombre.strip().title()
    autor_nuevo = libro_editado.autor.strip().title()
    descripcion_nueva = libro_editado.descripcion.strip().capitalize()

    # si cambia el nombre, chequear que no se repita con otro libro
    if nombre_nuevo != db_libro.nombre:
        libro_repetido = db.query(models.LibroModel).filter(
            models.LibroModel.nombre.ilike(nombre_nuevo),
            models.LibroModel.usuario_id == current_user_id
        ).first()

        if libro_repetido:
            raise HTTPException(
                status_code=400, 
                detail="ya tienes otro libro registrado con este nombre"
            )

    # actualizar los campos
    db_libro.nombre = nombre_nuevo
    db_libro.autor = autor_nuevo
    db_libro.descripcion = descripcion_nueva

    db.commit()
    db.refresh(db_libro)

    return db_libro

@router.delete("/{libro_id}")
def eliminar_libro(libro_id: int, db: Session = Depends(get_db), current_user_id: int = Depends(get_current_user_id)):
    # buscar el libro para borrarlo
    db_libro = db.query(models.LibroModel).filter(
        models.LibroModel.id == libro_id, 
        models.LibroModel.usuario_id == current_user_id
    ).first()

    if not db_libro:
        raise HTTPException(status_code=404, detail="libro no encontrado o no tienes permiso")
    
    db.delete(db_libro)
    db.commit()
    return {"message": "libro eliminado con exito"}