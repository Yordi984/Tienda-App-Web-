// src/pages/Torta.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Eliminamos isValid y parse de date-fns ya que el campo de hora será solo de visualización.
import Boton from '../../components/ui/ButtonComponent';
// import Header from '../../components/ui/HeaderComponent';
import NavBar from '../../components/ui/Navbar';
import './Torta.css';

import HeartIcon from '/icons/heart.svg';
import HomeIcon from '/icons/house.svg';
// import SearchIcon from '/icons/search.svg';
import UserRoundIcon from '/icons/user-round.svg';
// import ButtonComponent from '../../components/ui/ButtonComponent';
import HeaderProductDetail from '../../components/ui/HeaderProductDetail';

type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  disponibilidad: string; // Ej: "L,M,V" (días)
  horario: string; // Nuevo campo para el horario, ej: "08:30 - 16:00"
  whatsapp: string;
};

export default function Torta() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('08:30 - 16:00'); // Valor por defecto, se sobrescribirá con el backend
  const [isLiked, setIsLiked] = useState(false);

  // Los días siguen siendo para referencia de la visualización, no para selección del usuario.
  const allDays = [
    { label: 'L', value: 'L' },
    { label: 'M', value: 'M' },
    { label: 'X', value: 'X' },
    { label: 'J', value: 'J' },
    { label: 'V', value: 'V' },
    { label: 'S', value: 'S' }, // Añadido Sábado
    { label: 'D', value: 'D' }, // Añadido Domingo
  ];

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3000/producto/${id}`);
        const data: Producto = await res.json();
        setProducto(data);

        // Convertir disponibilidad string en array ['M', 'L'] y setear selectedDays
        if (data.disponibilidad) {
          const dias = data.disponibilidad.split(',').map(d => d.trim());
          setSelectedDays(dias);
        } else {
          setSelectedDays([]);
        }

        // Establecer el horario desde el backend si está disponible
        if (data.horario) {
          setTimeRange(data.horario);
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
      }
    };

    if (id) fetchProducto();
  }, [id]);

  // Eliminamos handleDayClick y handleTimeChange porque el usuario ya no puede editar
  // const handleDayClick = (day: string) => {
  //   setSelectedDays((prev) =>
  //     prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
  //   );
  // };

  // const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const [startTime, endTime] = e.target.value.split(' - ');
  //   const isStartValid = isValid(parse(startTime, 'HH:mm', new Date()));
  //   const isEndValid = isValid(parse(endTime, 'HH:mm', new Date()));
  //   if (isStartValid && isEndValid) setTimeRange(e.target.value);
  // };

  return (
    <div className='torta-container'>
      {/* <Header text='Hola ¿Qué comprarás hoy?' /> */}
     <HeaderProductDetail />
      <div className='header-bar-overlap'>
        <div className='header-actions'>
          {/* <button className='sell-button'>Vender</button> */}
         
          {/* <div className='search-box'>
            <input type='text' placeholder='Buscar' />
            <img src={SearchIcon} alt='Search' />
          </div> */}
        </div>
      </div>

      <div className='main-content'>
        <img
          className='product-image'
          src={producto?.imagen || 'https://via.placeholder.com/300'}
          alt={producto?.nombre || 'Producto'}
        />
        <div className='product-info'>
          <div className='product-header'>
            <h2>{producto?.nombre || 'Cargando...'}</h2>
            <img
              src={HeartIcon}
              alt='Heart'
              className={`heart-icon ${isLiked ? 'liked' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            />
          </div>

          <p className='product-description'>
            {producto?.descripcion || 'Esperando descripción del producto...'}
          </p>

          <div className='availability-box'>
            <span className='availability-title'>Horario de disponibilidad</span>
            <div className='availability-days'>
              {allDays.map((day) => (
                <button
                  key={day.value}
                  className={`day-button ${
                    selectedDays.includes(day.value) ? 'active' : ''
                  } read-only`}
                  disabled // Deshabilitamos el botón para evitar clics
                >
                  {day.label}
                </button>
              ))}
            </div>
            <div className='availability-info'>
              <span className='time-display'>
                {timeRange} {/* Ahora es un span, no un input */}
              </span>
            </div>
          </div>

          <div className='price-contact'>
            <span className='price'>${producto?.precio ?? '...'}</span>
            <div className='button-wrapper'>
              <Boton
                color='green'
                text='Contactar con el vendedor'
                onClick={() =>
                  producto?.whatsapp &&
                  window.open(`https://wa.me/529981893144`, '_blank')
                  // ${producto.whatsapp}
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className='footer-icons'>
        <img src={HomeIcon} alt='Home' />
        <img src={HeartIcon} alt='Favorites' />
        <img src={UserRoundIcon} alt='User' />
      </div>

      <NavBar />
    </div>
  );
}