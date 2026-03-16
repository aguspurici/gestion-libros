import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';
import { type BookModalProps } from '../../interface/interfaces';


const BookModal: React.FC<BookModalProps> = ({ open, onClose, onSave, initialData }) => {
    // estados para controlar los campos del formulario
    const [nombre, setNombre] = useState('');
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');

    // efecto para cargar datos si vamos a editar o limpiar si es nuevo
    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setAutor(initialData.autor);
            setDescripcion(initialData.descripcion);
        } else {
            setNombre('');
            setAutor('');
            setDescripcion('');
        }
    }, [initialData, open]);

    // funcion para enviar los datos y cerrar el modal
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ nombre, autor, descripcion });
        onClose(); 
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="book-modal-title">
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', width: 420,
                bgcolor: 'background.paper', boxShadow: 24,
                p: 4, borderRadius: 3
            }}>
                {/* titulo dinamico segun si editamos o agregamos */}
                <Typography id="book-modal-title" variant="h6" component="h2" mb={2}>
                    {initialData ? 'Editar Libro' : 'Agregar Nuevo Libro'}
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {/* input para el titulo del libro */}
                        <TextField
                            label="Nombre del libro"
                            fullWidth
                            required
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        {/* input para el autor */}
                        <TextField
                            label="Nombre del Autor"
                            fullWidth
                            required
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />
                        {/* input para la reseña o descripcion */}
                        <TextField
                            label="Descripción"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                        
                        <Stack spacing={2} direction="column">
                            {/* boton de guardado, se deshabilita si falta algun dato */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={!nombre.trim() || !autor.trim() || !descripcion.trim()}
                            >
                                {initialData ? 'Guardar Cambios' : 'Agregar'}
                            </Button>

                            {/* boton para cerrar sin hacer cambios */}
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={onClose}
                            >
                                Cancelar
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default BookModal;