import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../components/ui/HeaderComponent';
import './Principal.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent text='Bienvenido' />
      <div className='home-container'>
        <div className='home-hero'>
          <h1 className='home-title'>Tu espacio para conectar y crecer</h1>
          <p className='home-subtitle'>
            Únete como <strong>vendedor</strong> o <strong>comprador</strong> y
            forma parte de una comunidad que impulsa oportunidades.
          </p>
          <div className='home-buttons'>
            {/* <button
              className='home-btn'
              onClick={() => navigate('/elegir_cuenta')}
            >
              Comenzar ahora
            </button> */}
            <button
              className='home-btn login'
              onClick={() => navigate('/Login')}
            >
              Iniciar sesión
            </button>
          </div>
        </div>

        <div className='home-features'>
          <div className='feature-card'>
            <span className='feature-icon'>👥</span>
            <h3>Conexión entre personas</h3>
            <p>Encuentra lo que necesitas o vende tus productos fácilmente.</p>
          </div>

          <div className='feature-card'>
            <span className='feature-icon'>📦</span>
            <h3>Gestión de productos</h3>
            <p>
              Publica, edita y administra tus artículos desde un solo lugar.
            </p>
          </div>

          <div className='feature-card'>
            <span className='feature-icon'>🔐</span>
            <h3>Seguridad garantizada</h3>
            <p>Tu información está protegida y tu cuenta es segura.</p>
          </div>

          <div className='feature-card'>
            <span className='feature-icon'>📱</span>
            <h3>Diseño responsivo</h3>
            <p>Disfruta de una experiencia fluida en cualquier dispositivo.</p>
          </div>
        </div>
      </div>
    </>
  );
}
