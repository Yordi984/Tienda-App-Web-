import { useState } from "react";
import Header from "../../components/ui/HeaderComponent";
import Boton from "../../components/ui/ButtonComponent";
import "./select-login.css";

export default function SelectLogin() {
  const [selectedType, setSelectedType] = useState<"comprador" | "vendedor" | null>(null);

  const handleSelection = (type: "comprador" | "vendedor") => {
    setSelectedType(type);
    if (type === "comprador") {
      window.location.href = "/register-comprador";
    } else {
      window.location.href = "/register-vendedor";
    }
  };

  return (
    <>
      <Header text="¿Cómo quieres iniciar sesión?" />
      <div className="logo-container">
        <img
          src="/icons/icon.svg"
          alt=""
          style={{ width: "100px" }}
          className="logo"
        />
      </div>
      <div className="formulario">
        <div className="selection-container">
          <Boton 
            text="Soy Comprador" 
            color={selectedType === "comprador" ? "green" : "lightGray"} 
            onClick={() => handleSelection("comprador")}
          />
          <Boton 
            text="Soy Vendedor" 
            color={selectedType === "vendedor" ? "green" : "lightGray"} 
            onClick={() => handleSelection("vendedor")}
          />
        </div>
      </div>
      <div className="links">
        <a href="#">Política de privacidad</a>
      </div>
    </>
  );
} 