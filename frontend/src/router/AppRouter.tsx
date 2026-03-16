import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../pages/MainLayout';
import Login from '../pages/LoginPage';
import MisLibros from '../pages/MisLibrosPage';
import HomePage from '../pages/HomePage';
import Register from '../pages/RegisterPage';
import ProtectedRoute from './ProtectRoute';
import WelcomePage from '../pages/WelcomePage';



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      { 
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: < Register />,
      },
       {
      element: <ProtectedRoute />,
      children: [
        {
          path: "home",
          element: <WelcomePage />,
        },
        {
          path: "mis-libros",
          element: <MisLibros />,
        }
      ]
    }
      
    ],
  },
]);

export default router
