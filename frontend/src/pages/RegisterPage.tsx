import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Box, Card, CardContent, Typography, TextField, Button, Alert } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { registrarUsuario } from '../services/loginServices';
import { type RegisterData } from '../interface/interfaces';

const RegisterPage: React.FC = () => {
    // datos del formulario
    const [formData, setFormData] = useState<RegisterData>({
        nombre: '',
        email: '',
        password: ''
    });
    const [emailError, setEmailError] = useState<string>('');
    const navigate = useNavigate();

    // validar que el email tenga formato correcto
    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");

        // chequeos antes de mandar a la api
        if (!validateEmail(formData.email)) {
            setEmailError("el formato del correo no es valido");
            return;
        }

        if (formData.password.length < 6) {
            setEmailError("la contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            // mandamos los datos al servicio de registro
            await registrarUsuario(formData);
            console.log("usuario registrado correctamente");
            navigate("/login"); // si sale bien vamos al login
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.detail) {
                const detalle = err.response.data.detail;

                // mostrar error si viene como string
                if (typeof detalle === 'string') {
                    setEmailError(detalle);
                }
                // manejar error si viene como array
                else if (Array.isArray(detalle)) {
                    setEmailError("la contraseña es muy corta o el formato es invalido.");
                }
            } else {
                setEmailError("ocurrio un error inesperado.");
            }
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5' }}>
            <Card elevation={0} sx={{ width: '90%', maxWidth: 420, borderRadius: 3, border: '1px solid #e0e0e0', p: 1 }}>
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <AutoStoriesIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" fontWeight={700} color="primary.main">Crear cuenta</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Empieza a organizar tu colección hoy mismo</Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* input para el nombre */}
                        <TextField
                            fullWidth
                            label="Nombre completo"
                            value={formData.nombre}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nombre: e.target.value })}
                            margin="normal"
                            required
                        />
                        {/* input para el mail */}
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            type="email"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFormData({ ...formData, email: e.target.value });
                                if (emailError) setEmailError("");
                            }}
                            margin="normal"
                            required
                        />
                        {/* input para la pass */}
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                            margin="normal"
                            required
                        />

                        {/* mostrar alerta si hay error */}
                        {emailError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {emailError}
                            </Alert>
                        )}

                        <Button type="submit" variant="contained" size="large" sx={{ mt: 4, mb: 2, width: '180px', py: 1.2, textTransform: 'none', fontWeight: 600 }}>
                            Registrarse
                        </Button>
                    </Box>

                    {/* link para volver al login */}
                    <Typography variant="body2" textAlign="center" color="text.secondary" sx={{ mt: 2 }}>
                        ¿Ya tienes una cuenta? <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>Inicia sesión</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default RegisterPage;