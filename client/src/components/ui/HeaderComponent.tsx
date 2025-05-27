import React from "react";
import styles from "./HeaderComponent.module.css";

interface HeaderComponentProps {
  text: string; // La prop 'text' que recibirá el componente, de tipo string
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ text }) => {
  return (
    <header className={styles.header}>
      {/* El texto que se mostrará dentro de la barra verde, pasado como prop */}
      <p className={styles.headerText}>{text}</p>
    </header>
  );
};

export default HeaderComponent;
