import { useNavigate } from "react-router-dom";
import HeaderComponent from "../../components/ui/HeaderComponent";
import "./elegir_cuenta.css";

export default function ElegirCuenta() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent text="¿Qué tipo de cuenta deseas crear?" />
      <div className="container">
       
        <div className="buttons">
          <button className="boton" onClick={() => navigate("/crear_comprador")}>
            Crear cuenta como Comprador
          </button>
          <button className="boton" onClick={() => navigate("/crear_vendedor")}>
            Crear cuenta como Vendedor
          </button>
          <button className="botonl" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </>
  );
}
