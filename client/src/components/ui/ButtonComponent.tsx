//Este componente es un botón reutilizable que acepta diferentes props para personalizar su apariencia y comportamiento.

import React from 'react';
import styles from './ButtonComponent.module.css';

// Definimos los colores reutilizables como un enum o un tipo literal para seguridad de tipo
export type ButtonColor =
  | 'green' // rgba(25, 196, 100, 1)
  | 'lightGray' // rgb(255, 255, 255)
  | 'red' // rgba(255, 48, 2, 1)
  | 'yellow'; // rgb(255, 255, 255)
    

interface ButtonComponentProps {
  text: string; // El texto que se mostrará en el botón
  style?: React.CSSProperties;
  color: ButtonColor; // El color del botón, usando el tipo ButtonColor
  onClick?: () => void; // Función opcional que se ejecuta al hacer clic en el botón
  isActive?: boolean; // Prop opcional para indicar si el botón está activo (para el estilo 'Todo')
  hasGreenBorder?: boolean; // ¡NUEVO PROP!: Prop opcional para añadir un borde verde
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  color,
  onClick,
  isActive,
  style,
  hasGreenBorder, // Destructura el nuevo prop
}) => {
  const buttonClasses = `${styles.button} ${styles[color]} ${
    isActive ? styles.active : ''
  } ${
    hasGreenBorder ? styles.greenBorder : '' // Condicionalmente añade la clase greenBorder
  }`;

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;