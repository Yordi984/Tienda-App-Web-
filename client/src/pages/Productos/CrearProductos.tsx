import React, { useState, useEffect } from "react";
import Header from "../../components/ui/HeaderComponent";
import Input from "../../components/ui/InputComponent";
import Boton from "../../components/ui/ButtonComponent";
import NavBar from "../../components/ui/Navbar";
import "./CrearProductos.css";


const categorias = [
  "comida",
  "ropa",
  "tecnologia",
  "accesorios",
  "otros",
];

export default function CrearProductos() {
  const [diasActivos, setDiasActivos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    opciones: "",
    horario: "",
    precio: "",
    whatsapp: "",
    vendedorId: "", // Se llenará desde el token
    categoria: "otros", // Agregado categoría con valor por defecto
  });
  const [imagen, setImagen] = useState<File | null>(null);

  const dias = ["L", "M", "X", "J", "V"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.tipo === "vendedor") {
          setFormData((prev) => ({
            ...prev,
            vendedorId: payload.id,
          }));
        } else {
          alert("Solo los vendedores pueden crear productos.");
        }
      } catch (error) {
        console.error("Error al decodificar token:", error);
      }
    } else {
      alert("No estás autenticado.");
      window.location.href = "/Login";
    }
  }, []);

  const toggleDia = (dia: string) => {
    setDiasActivos((prev) =>
      prev.includes(dia) ? prev.filter((d) => d !== dia) : [...prev, dia]
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado.");
      return;
    }

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("opciones", formData.opciones);
    data.append("horario", formData.horario);
    data.append("disponibilidad", diasActivos.join(","));
    data.append("precio", formData.precio);
    data.append("whatsapp", formData.whatsapp);
    data.append("vendedorId", formData.vendedorId);
    data.append("categoria", formData.categoria); // Agregamos la categoría
    if (imagen) {
      data.append("imagen", imagen);
    }

    try {
      const res = await fetch("http://localhost:3000/producto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // NO pones Content-Type con multipart/form-data porque fetch lo asigna solo
        },
        body: data,
      });

      const responseBody = await res.json();

      if (res.ok) {
        alert("✅ Producto creado correctamente");
        window.location.href = "/mis_productos"
      } else {
        alert("❌ Error: " + (responseBody.message || "No se pudo crear el producto"));
      }
    } catch (err) {
      console.error("Error al enviar el producto:", err);
      alert("Error de red o del servidor");
    }
  };

  return (
    <div className="crear-productos-container">
      <Header text="Hola ¿Qué venderás?" />
      <div className="ordenar">
        <div className="form-box">
          <div className="inputs">
            <Input
              placeholder="Nombre del producto"
              name="nombre"
              onChange={handleChange}
              value={formData.nombre}
            />
            <Input
              placeholder="Descripción del producto"
              name="descripcion"
              onChange={handleChange}
              value={formData.descripcion}
            />
            <Input
              placeholder="Opciones del producto (si aplica)"
              name="opciones"
              onChange={handleChange}
              value={formData.opciones}
            />
            {/* Selector de Categoría */}
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              style={{ marginTop: "10px", padding: "8px", borderRadius: "4px" }}
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="dias-disponibles">
            <div className="titulo">
              <p>Disponibilidad</p>
              <div className="dias">
                {dias.map((dia) => (
                  <button
                    key={dia}
                    className={`dia ${diasActivos.includes(dia) ? "activo" : ""}`}
                    onClick={() => toggleDia(dia)}
                    type="button"
                  >
                    {dia}
                  </button>
                ))}
              </div>
            </div>
            <input
              className="horario-input"
              placeholder="Horario (ej. 8:30 am - 4:00 pm)"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
            />
          </div>

          <Boton color="green" text="Crear" onClick={handleSubmit} />
        </div>

        <div className="div-2">
          <Input
            placeholder="Precio"
            name="precio"
            onChange={handleChange}
            value={formData.precio}
          />
          <Input
            placeholder="Número de WhatsApp"
            name="whatsapp"
            onChange={handleChange}
            value={formData.whatsapp}
          />
          <Input type="file" onChange={handleFileChange} />
        </div>
      </div>
      <NavBar />
    </div>
  );
}
