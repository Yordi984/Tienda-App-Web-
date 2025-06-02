import React, { useState } from "react";
import CreateAccountForm from "../../components/layout/CreateAccountForm";

export default function Crear_vendedor() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/registrar/vendedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Cuenta creada con éxito");
      } else {
        alert("❌ " + (data.message || "Error al crear cuenta"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error de red o del servidor");
    }
  };

  return (
    <div>
      <h1>Crear cuenta</h1>
      <CreateAccountForm
        nombre={formData.nombre}
        correo={formData.correo}
        telefono={formData.telefono}
        password={formData.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
