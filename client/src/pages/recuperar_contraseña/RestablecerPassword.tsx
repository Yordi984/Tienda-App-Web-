import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RestablecerPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3000/restablecer/${token}`, {
        nuevaPassword,
      });

      setMensaje("Contraseña actualizada correctamente.");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMensaje("Hubo un error al restablecer la contraseña.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Guardar nueva contraseña</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
};

export default RestablecerPassword;
