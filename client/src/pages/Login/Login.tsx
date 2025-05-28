import Header from "../../components/ui/HeaderComponent";
import Boton from "../../components/ui/ButtonComponent";
import "./prueba.css";
export default function Prueba() {
  function solicitud() {
    console.log("Solicitud enviada");
  }
  return (
    <>
      <Header text="Hola ¿Qué compraras hoy?"></Header>
      <div className="logo-container">
        <img
          src="/icons/icon.svg"
          alt=""
          style={{ width: "100px" }}
          className="logo"
        />
      </div>
      <div className="formulario">
        <input type="text" placeholder="Correo Electrónico" />
        <input type="password" placeholder="Contraseña" />

        <Boton text="Iniciar sesion" color="green" onClick={solicitud}>
          {}
        </Boton>
      </div>
      <div className="links">
        <a href="#">Olvide mi Contraseña</a>
        <a href="#">Politica de privacidad</a>
      </div>
    </>
  );
}
