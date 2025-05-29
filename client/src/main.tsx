import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Login from "./pages/Login/Login.tsx";
import TortaDetalle from "./producto.tsx";
import SelectLogin from "./pages/Login/select-login.tsx";
import RegisterComprador from "./pages/Login/register-comprador.tsx";
import RegisterVendedor from "./pages/Login/register-vendedor.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/pro" element={<TortaDetalle/>} />
      <Route path="/select-login" element={<SelectLogin/>} />
      <Route path="/register-comprador" element={<RegisterComprador/>} />
      <Route path="/register-vendedor" element={<RegisterVendedor/>} />
    </Routes>
  </BrowserRouter>
);
