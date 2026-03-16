
import api from "./api"
import {type RegisterData, type LoginData } from "../interface/interfaces"

// funcion para registrar un nuevo usuario en la base de datos
export const registrarUsuario = async (userData: RegisterData) => {
    const response = await api.post('/usuarios/register ', userData)
    return response.data
}

// funcion para pedir el token de acceso al loguearse
export const loginUsuario = async (credenciales: LoginData) => {
    const response = await api.post("/usuarios/login", credenciales)
    return response.data
}