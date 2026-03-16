import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

// propiedades que recibe el componente para funcionar
interface ConfirmDeleteProps {
    open: boolean;         
    onClose: () => void;   
    onConfirm: () => void; 
    bookName?: string;     
    loading?: boolean
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
    open,
    onClose,
    onConfirm,
    bookName,
    loading
}) => {
    return (
        // componente de dialogo de material ui
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-delete-title"
            maxWidth="xs"
            fullWidth
        >
            {/* titulo del aviso */}
            <DialogTitle id="confirm-delete-title">
                Confirmar eliminación
            </DialogTitle>

            <DialogContent>
                {/* texto de advertencia al usuario */}
                <Typography>
                    ¿Estás seguro de que deseas eliminar el libro
                    {bookName ? <strong> {bookName}</strong> : " seleccionado"}?
                    Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                {/* boton para cerrar sin borrar nada */}
                <Button onClick={onClose} color="inherit">
                    Cancelar
                </Button>
                {/* boton para confirmar el borrado definitivo */}
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={loading}
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDelete;