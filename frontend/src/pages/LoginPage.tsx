import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useAuth } from "../context/AuthContext";
import {type LoginData} from "../interface/interfaces";

const LoginPage: React.FC = () => {
  // estado para guardar el mail y la pass
  const [data, setData] = useState<LoginData>({ email: '', password: '' });
  const [emailError, setEmailError] = useState<string>("");
  
  // traemos la funcion de login del contexto
  const { login } = useAuth();
  const navigate = useNavigate();

  // funcion para validar el formato del correo
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setEmailError("");

  // validar antes de intentar loguear
  if (!validateEmail(data.email)) {
    setEmailError("el formato del correo electronico no es valido");
    return;
  }

  try {
    // intentamos iniciar sesion con los datos del form
    await login(data.email, data.password);
    console.log("login exitoso");
    navigate("/home"); // si todo sale bien vamos al home
  } catch (error) {
    // si falla mostramos el aviso de error
    setEmailError("credenciales incorrectas. intentalo de nuevo.");
    
    // borrar el mensaje de error despues de 10 segundos
    setTimeout(() => setEmailError(""), 10000);
  }
};

  return (
    <Box sx={{ minHeight: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#f5f5f5" }}>
      <Card elevation={0} sx={{ width: "90%", maxWidth: 400, borderRadius: 3, border: "1px solid #e0e0e0", p: 2 }}>
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <AutoStoriesIcon sx={{ fontSize: 50, color: "primary.main", mb: 1 }} />
            <Typography variant="h4" fontWeight={700} color="primary.main">Bienvenido</Typography>
            <Typography variant="body2" color="text.secondary">Gestiona tu biblioteca personal</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* campo para el email */}
            <TextField
              fullWidth
              label="Correo electrónico"
              type="email"
              value={data.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData({...data, email: e.target.value});
                if (emailError) setEmailError("");
              }}
              margin="normal"
              required
            />
            {/* campo para la contraseña */}
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={data.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, password: e.target.value})}
              margin="normal"
              required
            />
            
            {/* alerta de error si el login falla */}
            {emailError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                  {emailError}
              </Alert>
            )}

            <Button type="submit" variant="contained" size="large" sx={{ px: 4, mt: 4, mb: 4, width: "180px", textTransform: "none", fontWeight: 600, "&:hover": { color: "white" } }}>
              Ingresar
            </Button>
          </Box>

          {/* link para ir al registro */}
          <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
            ¿No tienes una cuenta? <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", fontWeight: 600 }}>Regístrate</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;