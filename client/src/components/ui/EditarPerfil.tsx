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

  const [originalName, setOriginalName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalPhone, setOriginalPhone] = useState("");

  const token = localStorage.getItem("token");

  const showNotification = (message: string, type: "success" | "error" | "") => {
    console.log(`[NOTIFICACIÓN] Tipo: ${type}, Mensaje: ${message}`);
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  useEffect(() => {
    if (!token) {
      showNotification("No autorizado, por favor inicia sesión.", "error");
      return;
    }

    const fetchUser = async () => {
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

        setOriginalName(data.name || "");
        setOriginalEmail(data.email || "");
        setOriginalPhone(data.phone || "");
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        showNotification("Error al cargar el perfil", "error");
      }
    };

    fetchUser();
  }, [token]);

  const handleSave = async () => {
    if (!token) {
      showNotification("No autorizado, por favor inicia sesión.", "error");
      return;
    }

    const updates: Record<string, string> = {};

    if (name !== originalName) updates.name = name;
    if (email !== originalEmail) updates.email = email;
    if (phone !== originalPhone) updates.phone = phone;
    if (password.trim() !== "") updates.password = password;

    if (Object.keys(updates).length === 0) {
      showNotification("No hay cambios para guardar", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Error al actualizar");

      showNotification("¡Cambios guardados con éxito!", "success");
      setPassword("");
      setOriginalName(name);
      setOriginalEmail(email);
      setOriginalPhone(phone);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      showNotification("Error al guardar los cambios", "error");
    }
  };

  const handleDelete = async () => {
    if (!userId) {
      showNotification("ID de usuario no disponible para eliminar", "error");
      return;
    }
    if (!token) {
      showNotification("No autorizado, por favor inicia sesión.", "error");
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
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
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
