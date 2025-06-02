import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App.tsx';
import './index.css';
import Login from './pages/Login/Login.tsx';
import Recuperacion from './pages/recuperar_contraseña/Recuperacion.tsx';
import ResetPassword from './pages/recuperar_contraseña/RestablecerPassword.tsx';
import Torta from './pages/torta/Torta.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<App />}
      />
      <Route
        path='/Login'
        element={<Login />}
      />
      <Route
        path='/Torta'
        element={<Torta />}
      />

      <Route
        path='/Recuperacion'
        element={<Recuperacion />}
      />

      <Route
        path='/restablecer/:token'
        element={<ResetPassword />}
      />
    </Routes>
  </BrowserRouter>,
);
