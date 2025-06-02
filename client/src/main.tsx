import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
// import App from './App.tsx'; // Comentado porque Principal será la página principal
import Principal from './pages/principal/Principal.tsx';
import Login from './pages/Login/Login.tsx';
import Torta from './pages/torta/Torta.tsx';
import Recuperacion from './pages/recuperar_contraseña/Recuperacion.tsx';
import ResetPassword from './pages/recuperar_contraseña/RestablecerPassword.tsx';
// import SelectLogin from "./pages/Login/select-login.tsx";
// import RegisterComprador from "./pages/Login/register-comprador.tsx";
// import RegisterVendedor from "./pages/Login/register-vendedor.tsx";
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

       <Route path="/favoritos" element={<Favoritos />} />

    </Routes>
  </BrowserRouter>,
);
