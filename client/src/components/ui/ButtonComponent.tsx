import React from "react";
import styles from "./ButtonComponent.module.css";

// Definimos los colores reutilizables como un enum o un tipo literal para seguridad de tipo
export type ButtonColor =
  | "green" // rgba(25, 196, 100, 1)
  | "lightGray" // rgba(241, 243, 242, 1)
  | "red" // rgba(255, 48, 2, 1)
  | "yellow"; // rgba(255, 237, 41, 1)

interface ButtonComponentProps {
  text: string; // El texto que se mostrará en el botón
  color: ButtonColor; // El color del botón, usando el tipo ButtonColor
  onClick?: () => void; // Función opcional que se ejecuta al hacer clic en el botón
  isActive?: boolean; // Prop opcional para indicar si el botón está activo (para el estilo 'Todo')
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color,
  onClick,
  isActive,
}) => {
  // Clases CSS dinámicas basadas en las props
  const buttonClasses = `${styles.button} ${styles[color]} ${
    isActive ? styles.active : ""
  }`;

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonComponent;
