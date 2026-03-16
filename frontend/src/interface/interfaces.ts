export interface Book {
  id: number;
  nombre: string;
  autor: string;
  descripcion: string;
  propietario_id: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
    nombre: string;
    email: string;
    password: string;
}

export interface UserWelcomeProps {
    nombre: string;
}

export interface BookResponse {
    total: number;
    libros: Book[]; 
    skip: number;
    limit: number;
}

export interface BookModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { nombre: string; autor: string; descripcion: string }) => void;
  initialData?: Book | null; 
}

export interface BookTableProps {
  books: Book[]
  page: number
  totalCount: number
  onPageChange: (event: unknown, newPage: number) => void
  onEdit: (book: Book) => void
  onDelete: (id: number) => void
}

export interface BookInput {
  nombre: string;
  autor: string;
  descripcion: string;
}