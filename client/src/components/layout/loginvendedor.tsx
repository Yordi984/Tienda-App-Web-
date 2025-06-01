// src/components/RegistroComprador/RegistroComprador.tsx

import React, { useState } from 'react';
import './loginvendedor.css'; // Importa los estilos CSS

const RegistroComprador: React.FC = () => {
  // Estado para cada campo del formulario
  const [nombre, setNombre] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>(''); // Para mostrar mensajes al usuario (éxito/error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el recargado de la página

    // Validación básica (puedes añadir más validaciones aquí)
    if (!nombre || !telefono || !correo || !password) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    try {
      // Envía los datos al backend
      const response = await fetch(
        'http://localhost:3000/api/comprador/crear',
        {
          // ¡Asegúrate de que esta URL coincida con tu endpoint!
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, telefono, correo, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message || 'Cuenta de comprador creada exitosamente.');
        // Opcional: Limpiar el formulario después del éxito
        setNombre('');
        setTelefono('');
        setCorreo('');
        setPassword('');
      } else {
        setMensaje(data.message || 'Error al crear la cuenta de comprador.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error de conexión. Intenta de nuevo más tarde.');
    }
  };

  return (
    <div className='registro-comprador-container'>
      <header className='registro-header'>
        <h1>Crear cuenta para vender</h1>{' '}
        {/* El texto de la imagen dice "para vender", pero el controlador es "CrearComprador", ajusta si es necesario */}
      </header>

      <form
        className='registro-form'
        onSubmit={handleSubmit}
      >
        <div className='input-group'>
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            id='nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder='Tu nombre'
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor='telefono'>Número de teléfono</label>
          <input
            type='tel' // Tipo 'tel' para números de teléfono
            id='telefono'
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder='Ej: 5512345678'
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor='correo'>Correo electrónico</label>
          <input
            type='email' // Tipo 'email' para correos
            id='correo'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder='tu_correo@ejemplo.com'
            required
          />
        </div>

        <div className='input-group'>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password' // Tipo 'password' para ocultar la entrada
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Tu contraseña'
            required
          />
        </div>

        {mensaje && <p className='mensaje-feedback'>{mensaje}</p>}

        <div className='button-group'>
          <button
            type='submit'
            className='btn btn-crear'
          >
            Crear cuenta
          </button>
          <button
            type='button'
            className='btn btn-cancelar'
          >
            Cancelar
          </button>
        </div>
      </form>

      <footer className='registro-footer'>
        {/* Aquí irían los iconos de navegación si los necesitas, como en la imagen */}
        <div className='icon'>🏠</div>
        <div className='icon'>🔍</div>
        <div className='icon'>❤️</div>
        <div className='icon'>👤</div>
      </footer>
    </div>
  );
};

export default RegistroComprador;
