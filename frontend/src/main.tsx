import React from 'react'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import router from './router/AppRouter'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
)