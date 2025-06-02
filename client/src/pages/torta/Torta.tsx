import { useEffect, useState } from 'react';
import { isValid, parse } from 'date-fns';
import Boton from '../../components/ui/ButtonComponent';
import Header from '../../components/ui/HeaderComponent';
import NavBar from '../../components/ui/Navbar';

import './Torta.css';

import HeartIcon from '/icons/heart.svg';
import HomeIcon from '/icons/house.svg';
import SearchIcon from '/icons/search.svg';
import UserRoundIcon from '/icons/user-round.svg';

type Producto = {
  nombre: string;
  descripcion: string;
  imagen: string;
  precio: number;
  opcionesCarne: string[]; // campo dinámico para las opciones de carne
};

export default function Torta() {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [selectedMeat, setSelectedMeat] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<string[]>(['M']);
  const [timeRange, setTimeRange] = useState('08:30 - 16:00');
  const [isLiked, setIsLiked] = useState(false);

  const days = [
    { label: 'L', value: 'L' },
    { label: 'M', value: 'M' },
    { label: 'X', value: 'X' },
    { label: 'J', value: 'J' },
    { label: 'V', value: 'V' },
  ];

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch('http://localhost:5173/productos');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducto(data[0]);
          // Inicializa selectedMeat con la primera opción si existe
          if (data[0].opcionesCarne && data[0].opcionesCarne.length > 0) {
            setSelectedMeat(data[0].opcionesCarne[0]);
          }
        }
      } catch (err) {
        console.error('Error al cargar productos:', err);
      }
    };

    fetchProducto();
  }, []);

  const handleDayClick = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [startTime, endTime] = e.target.value.split(' - ');
    const isStartValid = isValid(parse(startTime, 'HH:mm', new Date()));
    const isEndValid = isValid(parse(endTime, 'HH:mm', new Date()));
    if (isStartValid && isEndValid) setTimeRange(e.target.value);
  };

  return (
    <div className='torta-container'>
      <Header text='Hola ¿Qué comprarás hoy?' />
      <div className='header-bar-overlap'>
        <div className='header-actions'>
          <button className='sell-button'>Vender</button>
          <div className='search-box'>
            <input type='text' placeholder='Buscar' />
            <img src={SearchIcon} alt='Search' />
          </div>
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

          <div className='tags'>
            {producto?.opcionesCarne?.length ? (
              producto.opcionesCarne.map((meat) => (
                <span
                  key={meat}
                  className={`meat-tag ${
                    selectedMeat === meat ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedMeat(meat)}
                >
                  {meat}
                </span>
              ))
            ) : (
              <p className="no-options">Sin opciones disponibles</p>
            )}
          </div>

          <div className='availability-box'>
            <span className='availability-title'>Horario de disponibilidad</span>
            <div className='availability-days'>
              {days.map((day) => (
                <button
                  key={day.value}
                  className={`day-button ${
                    selectedDays.includes(day.value) ? 'active' : ''
                  }`}
                  onClick={() => handleDayClick(day.value)}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <div className='availability-info'>
              <input
                type='text'
                value={timeRange}
                onChange={handleTimeChange}
                placeholder='HH:mm - HH:mm'
                className='time-input'
              />
            </div>
          </div>

          <div className='price-contact'>
            <span className='price'>${producto?.precio ?? '...'}</span>
            <div className='button-wrapper'>
              <Boton color='green' text='Contactar con el vendedor' />
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
