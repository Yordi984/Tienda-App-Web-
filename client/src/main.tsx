import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

// import App from './App.tsx'; // Comentado porque Principal será la página principal
import Home from './pages/principal/Principal.tsx';
import ProfileForm from './pages/perfil/perfil.tsx'; // Importado para usar en la página de perfil
// import App from './App.tsx';
import './index.css';

import Login from './pages/Login/Login.tsx';
import Torta from './pages/torta/Torta.tsx';
import Recuperacion from './pages/recuperar_contraseña/Recuperacion.tsx';
import ResetPassword from './pages/recuperar_contraseña/RestablecerPassword.tsx';
import CraerProductos from './pages/Productos/CrearProductos.tsx';
import Favoritos from './pages/favoritos/Favoritos.tsx';
import Crear_vendedor from './pages/crear_cuentas/crear_vendedor.tsx';
import CrearComprador from './pages/crear_cuentas/crear_comprador.tsx';
import ElegirCuenta from './pages/crear_cuentas/elegir_cuenta.tsx';
import Productos from './pages/Productos/Productos.tsx';
import ProductoAdmin from './pages/torta/ProductoAdmin.tsx'; 
import EditarProducto from './pages/Productos/EditarProducto.tsx'; 
import Mis_productos from './pages/mis_productos/mis_productos.tsx';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/Login'
        element={<Login />}
      />
        <Route path="/producto/:id" element={<Torta />} />

        <Route
          path='/Recuperacion'
        element={<Recuperacion/>} />

       <Route path="/restablecer/:token" element={<ResetPassword />} />
      <Route
        path='/CrearProductos'
        element={<CraerProductos/>} />
        
       <Route path="/favoritos" element={<Favoritos />} />

      <Route
        path='/crear_vendedor'
        element={<Crear_vendedor/>} />
      <Route
        path='/crear_comprador'
        element={<CrearComprador/>} />
      <Route
        path='/elegir_cuenta'
        element={<ElegirCuenta/>} />

      <Route
        path='/productos'
        element={<Productos />} />

      <Route
        path='/perfil'
        element={<ProfileForm />}
      />
        
      <Route
        path='/mis_productos'
        element={<Mis_productos />} />

      <Route
        path='/producto-admin/:id'
        element={<ProductoAdmin />}
      />
      <Route
        path='/editar-producto/:id'
        element={<EditarProducto />}
      />

    </Routes>
  </BrowserRouter>,
);
