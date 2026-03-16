import React, { useEffect, useState, useCallback } from 'react';
import { Container, Box, Typography, Button, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getBooks, createBook, updateBook, deleteBook } from '../services/bookServices';
import { type Book } from '../interface/interfaces';
import BookTable from '../components/misLibros/BookTable';
import BookModal from '../components/misLibros/BookModal';
import ConfirmDelete from '../components/misLibros/DeleteSection';


const MisLibrosPage: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //traer los libros desde la API
    const loadBooks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {

            const skipValue = page * 10;
            const data = await getBooks(skipValue, 10);

            setBooks(data.libros);
            setTotalCount(data.total);
        } catch (err) {
            setError("No se pudieron cargar los libros. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }, [page]);

    //cargar los datos cuando cambia la página
    useEffect(() => {
        loadBooks();
    }, [loadBooks]);


    //crear un nuevo libro o editar uno existente
    const handleSave = async (formData: { nombre: string; autor: string; descripcion: string }) => {
        try {
            setError(null);
            if (selectedBook) {

                await updateBook(selectedBook.id, formData);
            } else {

                await createBook(formData);
            }
            setIsModalOpen(false);
            loadBooks();
        } catch (err: any) {
            const mensaje = err.response?.data?.detail || "No se pudo guardar el libro";
            setError(mensaje);


            setTimeout(() => {
                setError(null);
            }, 6000);
        }
    };

    //  borrar un libro
    const handleConfirmDelete = async () => {
        if (!selectedBook) return;
        try {
            setLoading(true);
            await deleteBook(selectedBook.id);
            setIsDeleteOpen(false);


            if (books.length === 1 && page > 0) setPage(page - 1);
            else loadBooks();
        } catch (err) {
            alert("No se pudo eliminar el libro");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth={false} sx={{ minWidth: "100vw", minHeight: "100vh", bgcolor: 'white', py: 15, px: { md: 10 } }}>


            <Box display="flex" justifyContent="space-between" alignItems="center" mb={5} >
                <Typography variant="h4" fontWeight="bold" color="primary">
                    Mis Libros
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setError(null)
                        setSelectedBook(null)
                        setIsModalOpen(true)
                    }}
                >
                    Agregar Libro
                </Button>
            </Box>

            {/* alerta para mostrar errores si fallan las peticiones */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}


            {/* spinner de carga */}
            {loading && books.length === 0 ? (
                <Box display="flex" justifyContent="center" my={5}>
                    <CircularProgress />
                </Box>
            ) : (
                // tabla de libros
                <BookTable
                    books={books}
                    page={page}
                    totalCount={totalCount}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onEdit={(book) => { setSelectedBook(book); setIsModalOpen(true); }}
                    onDelete={(id) => {
                        const book = books.find(b => b.id === id);
                        setSelectedBook(book || null);
                        setIsDeleteOpen(true);
                    }}
                />
            )}


            {/* modal de agregar o modificar */}
            <BookModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={selectedBook}
            />

            {/*confirmar la eliminacion */}
            <ConfirmDelete
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                bookName={selectedBook?.nombre}
                loading={loading}
            />
            <Box />
        </Container>
    );
};

export default MisLibrosPage;