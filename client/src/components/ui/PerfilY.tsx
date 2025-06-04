import React, { useEffect, useState } from "react";
import styles from "./ProfileForm.module.css";
import InputComponent from "../ui/InputComponent";
import ButtonComponent from "../ui/ButtonComponent";

const ProfileForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "" }>({ message: "", type: "" });

  const token = localStorage.getItem("token");

  const showNotification = (message: string, type: "success" | "error" | "") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const fetchUser = React.useCallback(async () => {
    if (!token) {
      showNotification("No autorizado, por favor inicia sesión.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("No se pudo obtener el perfil");
      const data = await response.json();
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setUserId(data.id || null);
    } catch {
      showNotification("Error al cargar el perfil", "error");
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSave = async () => {
    if (!token) {
      showNotification("No autorizado, por favor inicia sesión.", "error");
      return;
    }

    const fieldsToUpdate: { [key: string]: string } = {};
    if (name.trim()) fieldsToUpdate.name = name;
    if (email.trim()) fieldsToUpdate.email = email;
    if (phone.trim()) fieldsToUpdate.phone = phone;
    if (password.trim()) fieldsToUpdate.password = password;

    if (Object.keys(fieldsToUpdate).length === 0) {
      showNotification("No hay datos para actualizar", "error");
      return;
    }

    try {
      console.log("Enviando PUT con:", fieldsToUpdate);

      const response = await fetch("http://localhost:3000/perfiledit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fieldsToUpdate),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      showNotification("¡Cambios guardados con éxito!", "success");
      setPassword("");
      await fetchUser();
    } catch (error) {
      console.error("Error al hacer PUT:", error);
      showNotification("Error al guardar los cambios", "error");
    }
  };

  const handleDelete = async () => {
    if (!userId || !token) {
      showNotification("No autorizado o ID no disponible", "error");
      return;
    }

    if (!confirm("¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/perfil/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al eliminar");

      showNotification("Usuario eliminado", "success");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch {
      showNotification("Error al eliminar la cuenta", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showNotification("¡Sesión cerrada correctamente!", "success");
    window.location.href = "/login";
  };

  return (
    <div className={styles.formContainer}>
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <InputComponent placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} name="name" id="name" />
      <InputComponent placeholder="Correo electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} name="email" id="email" />
      <InputComponent placeholder="Número de teléfono" type="tel" value={phone} onChange={e => setPhone(e.target.value)} name="phone" id="phone" />
      <InputComponent placeholder="Cambiar contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="password" />

      <div className={styles.buttonGroup}>
        <ButtonComponent text="Guardar cambios" color="green" onClick={handleSave} />
        <ButtonComponent text="Eliminar cuenta" color="red" onClick={handleDelete} />
        <ButtonComponent text="Cerrar sesión" color="yellow" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default ProfileForm;
