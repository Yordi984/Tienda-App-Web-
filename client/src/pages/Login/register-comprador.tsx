import { useState } from "react";
import Header from "../../components/ui/HeaderComponent";
import Boton from "../../components/ui/ButtonComponent";
import "./register-comprador.css";

export default function RegisterComprador() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
    telefono: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido) newErrors.apellido = "El apellido es requerido";
    if (!formData.correo) newErrors.correo = "El correo es requerido";
    if (!formData.contrasena) newErrors.contrasena = "La contraseña es requerida";
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "Las contraseñas no coinciden";
    }
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          window.location.href = "/login";
        } else {
          const data = await response.json();
          setErrors({ submit: data.mensaje || "Error al registrar usuario" });
        }
      } catch (error) {
        setErrors({ submit: "Error de conexión" });
      }
    }
  };

  const handleBack = () => {
    window.location.href = "/select-login";
  };

  return (
    <>
      <Header text="Registro de Comprador" />
      <div className="logo-container">
        <img
          src="/icons/icon.svg"
          alt=""
          style={{ width: "100px" }}
          className="logo"
        />
      </div>
      <form onSubmit={handleSubmit} className="register-container">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre"
          />
          {errors.nombre && <div className="error-message">{errors.nombre}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido"
          />
          {errors.apellido && <div className="error-message">{errors.apellido}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Ingresa tu correo"
          />
          {errors.correo && <div className="error-message">{errors.correo}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Ingresa tu teléfono"
          />
          {errors.telefono && <div className="error-message">{errors.telefono}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
          />
          {errors.contrasena && <div className="error-message">{errors.contrasena}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmarContrasena"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
          />
          {errors.confirmarContrasena && (
            <div className="error-message">{errors.confirmarContrasena}</div>
          )}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <div className="button-container">
          <Boton text="Registrarse" color="green" onClick={handleSubmit} />
          <Boton text="Volver" color="lightGray" onClick={handleBack} />
        </div>
      </form>

      <div className="links">
        <a href="#">Política de privacidad</a>
      </div>
    </>
  );
} 