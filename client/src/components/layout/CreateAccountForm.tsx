import React, { useState } from "react";
import styles from "./CreateAccountForm.module.css"; // Crearemos este archivo CSS
import InputComponent from "../ui/InputComponent"; // Importa el InputComponent
import ButtonComponent from "../ui/ButtonComponent"; // Importa el ButtonComponent

const CreateAccountForm: React.FC = () => {
  // Estados para cada campo del formulario de creación de cuenta
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  // Función para mostrar una notificación temporal
  const showNotification = (
    message: string,
    type: "success" | "error" | ""
  ) => {
    setNotification({ message, type });
    // Ocultar la notificación después de 3 segundos (3000 ms)
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Manejadores de cambios para cada input
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Función para manejar el envío del formulario de creación de cuenta
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault(); // Evita el recargado de la página por defecto del formulario HTML

    console.log("Intentando crear cuenta con:", {
      name,
      email,
      phone,
      password,
    });
    // Aquí integrarías la lógica para enviar estos datos a tu backend/API para registrar al usuario
    // Ejemplo:
    // try {
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, phone, password })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     showNotification('¡Cuenta creada con éxito! Redirigiendo...', 'success');
    //     // Puedes redirigir al usuario o iniciar sesión automáticamente
    //     // setTimeout(() => { window.location.href = '/dashboard'; }, 1500);
    //   } else {
    //     showNotification(data.message || 'Error al crear la cuenta.', 'error');
    //   }
    // } catch (error) {
    //   console.error('Error de red al crear cuenta:', error);
    //   showNotification('Error de conexión. Inténtalo más tarde.', 'error');
    // }

    // Simulación de respuesta de API (para demostración)
    const success = Math.random() > 0.3; // 70% de éxito, 30% de error
    if (success) {
      showNotification("¡Cuenta creada con éxito! Redirigiendo...", "success");
      // Opcional: Limpiar el formulario después del éxito
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      // Aquí redirigirías al usuario
    } else {
      showNotification(
        "Hubo un error al crear la cuenta. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleCreateAccount}>
      {/* Notificación que aparece condicionalmente */}
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Campo de Nombre */}
      <InputComponent
        placeholder="Nombre"
        value={name}
        onChange={handleNameChange}
        name="name"
        id="name"
      />

      {/* Campo de Correo electrónico */}
      <InputComponent
        placeholder="Correo electrónico"
        type="email"
        value={email}
        onChange={handleEmailChange}
        name="email"
        id="email"
      />

      {/* Campo de Número de teléfono */}
      <InputComponent
        placeholder="Número de teléfono"
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        name="phone"
        id="phone"
      />

      {/* Campo de Contraseña */}
      <InputComponent
        placeholder="Contraseña" // En lugar de "Cambiar contraseña"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        name="password"
        id="password"
      />

      {/* Botón "Crear cuenta" (verde) */}
      <div className={styles.buttonWrapper}>
        {" "}
        {/* Contenedor para centrar el botón si es necesario */}
        <ButtonComponent
          text="Crear cuenta"
          color="green" // El color verde para el botón de acción principal
          onClick={() => {}} // El evento onSubmit del form también lo dispara, así que aquí no hacemos nada
        />
      </div>
    </form>
  );
};

export default CreateAccountForm;
