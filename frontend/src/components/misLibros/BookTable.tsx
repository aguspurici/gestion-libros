import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type BookTableProps } from '../../interface/interfaces';

const BookTable: React.FC<BookTableProps> = ({
  books,
  page,
  totalCount,
  onPageChange,
  onEdit,
  onDelete
}) => {
  return (
    // contenedor principal de la tabla con sombra y bordes
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Table>
        {/* encabezado de la tabla con los nombres de las columnas */}
        <TableHead sx={{ bgcolor: 'primary.light' }}>
          <TableRow>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Autor</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
            <TableCell align="center"><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* recorremos la lista de libros para armar las filas */}
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.nombre}</TableCell>
              <TableCell>{book.autor}</TableCell>
              <TableCell>{book.descripcion}</TableCell>
              <TableCell align="center">
                {/* botones para editar o borrar cada libro */}
                <IconButton onClick={() => onEdit(book)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(book.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* componente para manejar el cambio de paginas */}
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalCount}
        rowsPerPage={10}
        page={page}
        onPageChange={onPageChange}
      />
    </TableContainer>
  );
};

export default BookTable;