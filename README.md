# 📚 Gestión de Libros - Proyecto Full Stack

Este proyecto es una aplicación web para la gestión de libros que permite a los usuarios registrarse, iniciar sesión y realizar operaciones CRUD sobre libros.

## 🚀 Tecnologías utilizadas

### Frontend

* React
* Redux
* Material UI
* Axios

### Backend

* Python 
* FastAPI
* SQLAlchemy

### Base de datos

* PostgreSQL

---

# ⚙️ Instalación del proyecto

Para ejecutar el proyecto en tu computadora seguí los siguientes pasos.

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/gestion-libros.git
```

Entrar en la carpeta del proyecto:

```bash
cd gestion-libros
```

---

# 📦 Instalación de dependencias

## Backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Crear entorno virtual:

```bash
uv venv
```

Instalar dependencias:

```bash
uv pip install -r requirements.txt
```

Antes de iniciar el backend, es necesario crear un archivo .env en la carpeta backend con las siguientes variables:

### URL de la base de datos PostgreSQL

```bash
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_db
```

### Clave secreta para firmar los tokens JWT

```bash
SECRET_KEY=una_clave_super_secreta
```

Reemplazá usuario, contraseña y nombre_db con los datos de tu PostgreSQL local.

La SECRET_KEY puede ser cualquier string largo y aleatorio.

Estas variables son necesarias para que la app se conecte a la base de datos y genere los tokens JWT correctamente.


Iniciar el servidor:

```bash
uv uvicorn main:app --reload
```

---

## Frontend

Abrir otra terminal y entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

---

# 🔐 Funcionalidades

* Registro de usuarios
* Login con autenticación
* Crear libros
* Editar libros
* Eliminar libros
* Listar libros

---

# 👨‍💻 Autor

Agustín Purici
