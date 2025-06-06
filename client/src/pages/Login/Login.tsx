import { useState } from 'react';
import Header from '../../components/ui/HeaderComponent';
import Boton from '../../components/ui/ButtonComponent';

import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

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

      if (data.usuario && data.usuario.id) {
        localStorage.setItem('vendedorId', data.usuario.id.toString());
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
        <div className='boton-container'>
          <Boton 
            // style={{  width: '25%', margin: '20px auto', padding: '1rem' }}
            text='Iniciar sesión'
            color='green'
            onClick={solicitud}
          />

          <Boton
            // style={{  width: '25%', margin: '20px auto', padding: '1rem'  }}
            text='¿No tienes cuenta? Regístrate'
            color='lightGray'
            hasGreenBorder={true}
            onClick={() => navigate("/crear_vendedor")}
          />
        </div>
        
          
          
       
      </div>
      <div className='links'>
        <a href='/Recuperacion'>Olvidé mi Contraseña</a>
        {/* <a href='/elegir_cuenta'>Crear cuenta</a> */}
      </div>
    </>
  );
}