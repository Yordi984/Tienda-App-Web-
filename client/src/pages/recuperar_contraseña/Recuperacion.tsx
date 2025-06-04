import { useState } from 'react';
import InputComponent from '../../components/ui/InputComponent';
import Header from '../../components/ui/HeaderComponent';
import Boton from '../../components/ui/ButtonComponent';
import '/logo.png';
import './Recuperacion.css'; // Asegúrate de tener un archivo CSS para estilos específicos
import { useNavigate } from 'react-router-dom';

export default function Recuperacion() {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });

      const data = await respuesta.json();
      if (respuesta.ok) {
        alert('Correo enviado correctamente');
      } else {
        alert('Error: ' + (data.message || 'No se pudo enviar el correo'));
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <Header text="Recuperar contraseña" />
      <div className="logo-container">
        <img src="/logo.png" alt="logo" className="logo" />
      </div>

      <div className="formulario">
        <InputComponent
          type="text"
          placeholder="Correo  electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <p>Se enviará un correo para poder recuperar tu cuenta</p>
        <div className="boton-container">
        <Boton  text="Enviar" color="green"  style={{ width: '400px' }} onClick={manejarEnvio} /> </div>

        <div className="boton-container" >

        </div>
         <Boton
              text="Volver"
              color="green"
              style={{ width: '400px' }}
              onClick={() => navigate('/Login')}
            />
            
       
      </div>
    </>
  );
}
