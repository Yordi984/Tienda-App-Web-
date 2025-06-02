import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

// import App from './App.tsx'; // Comentado porque Principal será la página principal
import Principal from './pages/principal/Principal.tsx';

// import App from './App.tsx';
import './index.css';

import Login from './pages/Login/Login.tsx';
import Torta from './pages/torta/Torta.tsx';
import Recuperacion from './pages/recuperar_contraseña/Recuperacion.tsx';
import ResetPassword from './pages/recuperar_contraseña/RestablecerPassword.tsx';

import CraerProductos from './pages/Productos/CrearProductos.tsx';
import Favoritos from './pages/favoritos/Favoritos.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<Principal />}
      />
      <Route
        path='/Login'
        element={<Login />}
      />
      <Route
        path='/Torta'
        element={<Torta/>} />

        <Route
          path='/Recuperacion'
        element={<Recuperacion/>} />

       <Route path="/restablecer/:token" element={<ResetPassword />} />
      <Route
        path='/CrearProductos'
        element={<CraerProductos/>} />



       <Route path="/favoritos" element={<Favoritos />} />
       
    </Routes>
  </BrowserRouter>,
);
