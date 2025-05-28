import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Login from "./pages/Login/Login.tsx";
import TortaDetalle from "./producto.tsx";


createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
    <Routes>
      <Route path="/Login" element={<Login />} />
       <Route path="/pro" element={<TortaDetalle/>} />
    </Routes>
  </BrowserRouter>
);
