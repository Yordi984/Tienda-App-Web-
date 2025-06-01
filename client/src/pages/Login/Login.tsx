import { useState } from 'react';
import Header from '../../components/ui/HeaderComponent';
import Boton from '../../components/ui/ButtonComponent';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function solicitud() {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo,
          contrasena,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        alert('Inicio de sesión exitoso');
      } else {
        alert('Error: ' + data.mensaje || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error de red o servidor');
    }
  }

  return (
    <>
      <Header text='Hola ¿Qué comprarás hoy?' />
      <div className='logo-container'>
        <img
          src='/icons/icon.svg'
          alt=''
          style={{ width: '100px' }}
          className='logo'
        />
      </div>
      <div className='formulario'>
        <input
          type='text'
          placeholder='Correo Electrónico'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type='password'
          placeholder='Contraseña'
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

        <Boton
          text='Iniciar sesión'
          color='green'
          onClick={solicitud}
        />
      </div>
      <div className='links'>
        <a href='#'>Olvidé mi Contraseña</a>
        <a href='#'>Política de privacidad</a>
      </div>
    </>
  );
}
