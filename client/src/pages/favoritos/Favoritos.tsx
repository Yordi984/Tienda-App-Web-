"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import HeaderComponent from "../../components/ui/HeaderComponent";
import CardUser from "../../components/ui/CardUser"; 
import Navar from "../../components/ui/Navbar"


interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

export default function MisProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const vendedorId = localStorage.getItem("vendedorId");

    if (!vendedorId) {
      setError("No se encontró el ID del vendedor.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/mis-favoritos/${vendedorId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => setProductos(data.favoritos ?? data)) 
      .catch((err) => {
        console.error(err);
        setError("Error al cargar productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4">
      <HeaderComponent text="Mis Favoritos" />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {!loading && !error && productos.length === 0 && (
          <p style={{display:"flex", justifyItems:"center" }} >No tienes productos favoritos</p>
        )}
        {productos.map((producto) => (
          <CardUser
            key={producto.id}
            imageUrl={producto.imagen}
            altText={producto.nombre}
            productName={producto.nombre}
            productPrice={producto.precio}
            onClick={() => navigate(`/producto-admin/${producto.id}`)}
          />
        ))}
      </div>
      <Navar />
    </div>
  );
}