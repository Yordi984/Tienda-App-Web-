"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import HeaderComponent from "../../components/ui/HeaderComponent";
import CardUser from "../../components/ui/CardUser"; // Asegúrate de que la ruta sea correcta

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
  const navigate = useNavigate(); // Inicializa navigate

  useEffect(() => {
    const vendedorId = localStorage.getItem("vendedorId");

    if (!vendedorId) {
      setError("No se encontró el ID del vendedor.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/mis-productos/${vendedorId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar productos.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <HeaderComponent text="Mis Productos" />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {productos.map((producto) => (
          <CardUser
            key={producto.id}
            imageUrl={producto.imagen}
            altText={producto.nombre}
            productName={producto.nombre}
            productPrice={producto.precio}
            
           
            
            
            
            onClick={() => navigate(`/producto-admin/${producto.id}`)} // Aquí navegas a la ruta con el id
          />
        ))}
      </div>
    </div>
  );
}
