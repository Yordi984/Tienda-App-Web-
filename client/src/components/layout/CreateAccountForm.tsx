import React from "react";
import styles from "./CreateAccountForm.module.css";
import InputComponent from "../ui/InputComponent";
import ButtonComponent from "../ui/ButtonComponent";

interface Props {
  nombre: string;
  correo: string;
  telefono: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateAccountForm: React.FC<Props> = ({
  nombre,
  correo,
  telefono,
  password,
  onChange,
  onSubmit,
}) => {
  return (
    <form className={styles.formContainer} onSubmit={onSubmit}>
      <InputComponent
        placeholder="Nombre"
        value={nombre}
        onChange={onChange}
        name="nombre"      // Corregido
        id="nombre"
      />

      <InputComponent
        placeholder="Correo electrónico"
        type="email"
        value={correo}
        onChange={onChange}
        name="correo"      // Corregido
        id="correo"
      />

      <InputComponent
        placeholder="Número de teléfono"
        type="tel"
        value={telefono}
        onChange={onChange}
        name="telefono"    // Corregido
        id="telefono"
      />

      <InputComponent
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={onChange}
        name="password"
        id="password"
      />

      <div className={styles.buttonWrapper}>
        <ButtonComponent
          text="Crear cuenta"
          color="green"
          onClick={() => {}} // opcional; el `submit` ya se maneja con el `onSubmit` del form
        />
      </div>
    </form>
  );
};

export default CreateAccountForm;
