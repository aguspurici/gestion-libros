import { createContext, useState, type ReactNode, useContext } from 'react';
import api from '../services/api'; 

// definimos que datos vamos a compartir en el contexto
interface AuthContextType {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// creamos el contexto para el login
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// componente para envolver la app y pasar los datos
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // estado para guardar el token, se fija si ya hay uno en el localstorage
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // estado para el usuario, tambien lo busca en el localstorage
  const [user, setUser] = useState<any | null>(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // saber si esta logueado segun si hay token o no
  const isAuthenticated = !!token; 

  // funcion para conectar con la api y loguearse
  const login = async (email: string, password: string) => {
  try {

    const response = await api.post("/usuarios/login", {
      email,
      password
    });

    const { access_token, usuario } = response.data;

    // guardamos los datos en el estado
    setToken(access_token);
    setUser(usuario);

    // guardamos en el navegador para no perder la sesion al recargar
    localStorage.setItem("token", access_token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

  } catch (error) {
    console.error("error en el login", error);
    throw new Error("credenciales incorrectas");
  }
};

  // funcion para cerrar sesion y limpiar todo
  const logout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

  return (
    // pasamos todas las funciones y estados a los hijos
    <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook para usar el login mas facil en cualquier parte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};