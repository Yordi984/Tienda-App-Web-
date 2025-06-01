import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../../components/ui/HeaderComponent";
import "./RestablecerPassword.css"; // Asegúrate de importar el archivo CSS

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
    <div>
        <Header text="Restablecer contraseña"></Header>
      <div className="logo-container">
        <div className="logo">
            <img src="/logo.png" alt="logo" className="logo" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="formulario">
        <h2></h2>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          required
        />
        <div className="boton-container">
          <button type="submit">Guardar nueva contraseña</button>
         
        </div>
        <p>{mensaje}</p>
      </form>
    </div>
  );
};

export default RestablecerPassword;
