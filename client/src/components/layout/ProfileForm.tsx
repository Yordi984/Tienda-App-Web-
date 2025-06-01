import React, { useState } from "react";
import styles from "./ProfileForm.module.css"; // Crearemos este archivo CSS
import InputComponent from "../ui/InputComponent"; // Importa el InputComponent
import ButtonComponent from "../ui/ButtonComponent"; // Importa el ButtonComponent

const ProfileForm: React.FC = () => {
  // Estados para cada campo del formulario
  const [name, setName] = useState("Juan Pérez"); // Valor inicial de ejemplo
  const [email, setEmail] = useState("juan.perez@example.com");
  const [phone, setPhone] = useState("55 1234 5678");
  const [password, setPassword] = useState(""); // Contraseña generalmente vacía o para reconfirmar

  // Nuevo estado para la notificación
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

  // Función para guardar los cambios
  const handleSave = () => {
    console.log("Guardar cambios:", { name, email, phone, password });
    // Aquí integrarías la lógica real para enviar estos datos a tu backend o API
    // Por ejemplo, una llamada a fetch o axios

    // Simulación de éxito o error
    const success = Math.random() > 0.3; // 70% de éxito, 30% de error para prueba

    if (success) {
      showNotification("¡Cambios guardados con éxito!", "success");
      setPassword(""); // Limpiar el campo de contraseña por seguridad después de guardar
    } else {
      showNotification(
        "Error al guardar los cambios. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Aquí integrarías la lógica real para cerrar la sesión del usuario
    // Por ejemplo, limpiar tokens de autenticación, redirigir a la página de login
    showNotification("¡Sesión cerrada correctamente!", "success");
    // En una aplicación real, aquí harías una redirección:
    // window.location.href = '/login';
  };

  return (
    <div className={styles.formContainer}>
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

      {/* Campo de Cambiar contraseña */}
      <InputComponent
        placeholder="Cambiar contraseña"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        name="password"
        id="password"
      />

      {/* Contenedor para los botones */}
      <div className={styles.buttonGroup}>
        {/* Botón "Guardar cambios" */}
        <ButtonComponent
          text="Guardar cambios"
          color="green"
          onClick={handleSave}
        />

        {/* Botón "Cerrar sesión" */}
        <ButtonComponent
          text="Cerrar sesión"
          color="yellow"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
