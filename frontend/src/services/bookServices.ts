
import api from "./api"
import { type Book, type BookResponse, type BookInput } from "../interface/interfaces";

// pedir la lista de libros con paginacion
export const getBooks = async (
  skip: number = 0,
  limit: number = 10
): Promise<BookResponse> => {
  const response = await api.get<BookResponse>('/libros/', {
    params: { skip, limit } // mandamos los parametros para el filtrado
  });

  return response.data;
};

// funcion para guardar un libro nuevo
export const createBook = async (book: BookInput) => {
    const response = await api.post('/libros/', book);
    return response.data;
};

// funcion para editar los datos de un libro por su id
export const updateBook = async (
  id: number,
  book: BookInput
): Promise<Book> => {
  const { data } = await api.put<Book>(`/libros/${id}`, book);
  return data;
};

// funcion para borrar un libro de la base de datos
export const deleteBook = async (id: number): Promise<void> => {
  await api.delete(`/libros/${id}`);
};