import { useState } from 'react';
import Header from '../../components/ui/HeaderComponent';
import Boton from '../../components/ui/ButtonComponent';

import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function solicitud() {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, password: contrasena }),
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', data);

    if (response.ok) {
      alert('Inicio de sesión exitoso');
      localStorage.setItem('token', data.token);

      // Guardar vendedorId si existe en la respuesta
      if (data.vendedorId) {
        localStorage.setItem('vendedorId', data.vendedorId.toString());
      } else {
        console.warn('No se recibió vendedorId del servidor.');
      }
        window.location.href = '/productos';
    } else {
      alert('Error: ' + (data.message || 'Credenciales incorrectas'));
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
          src='/logo.png'
          alt='logo'
          style={{ width: '100px' }}
          className='logo'
        />
      </div>
      <div className='formulario'>
        <input
          type='text'
          placeholder='Correo'
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
            style={{  width: '25%', margin: '20px auto', padding: '1rem' }}
            text='Iniciar sesión'
            color='green'
            onClick={solicitud}
          />
       
      </div>
      <div className='links'>
        <a href='/Recuperacion'>Olvidé mi Contraseña</a>
        <a href='/elegir_cuenta'>Crear cuenta</a>
      </div>
    </>
  );
}