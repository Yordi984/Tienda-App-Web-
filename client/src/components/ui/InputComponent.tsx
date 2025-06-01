import React from 'react';
import styles from './InputComponent.module.css';

interface InputComponentProps {
  placeholder?: string; // Prop para el texto de marcador de posición (ej. "Nombre")
  type?: string; // Prop opcional para el tipo de input (text, password, email, etc.)
  value?: string; // Prop opcional para controlar el valor del input (uso controlado)
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Prop opcional para manejar cambios en el input
  name?: string; // Prop opcional para el atributo 'name' del input
  id?: string; // Prop opcional para el atributo 'id' del input
  readOnly?: boolean; // Prop opcional para hacer el input de solo lectura
  disabled?: boolean; // Prop opcional para deshabilitar el input
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder = 'Introduce texto...', // Valor por defecto para el placeholder
  type = 'text', // Valor por defecto para el tipo de input
  value,
  onChange,
  name,
  id,
  readOnly,
  disabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        readOnly={readOnly}
        disabled={disabled}
        className={styles.inputField}
      />
    </div>
  );
};

export default InputComponent;
