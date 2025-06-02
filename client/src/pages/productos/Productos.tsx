import placeholderImage from '../../assets/images/e68cb44a58a39c061825f8071bfd76ba.jpg';
import HeaderWithSearchbar from '../../components/HeaderWithSearchbar';
import { HeartIcon } from '../../components/icons';
import NavBar from '../../components/ui/Navbar';
import styles from './Principal.module.css';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  disponibilidad: string;
  precio: number;
  whatsapp: number;
  imagen?: string;
  // vendedor: Vendedor;
}

export default function Productos() {
  const products: Product[] = [
    {
      id: 1,
      nombre: 'Torta de Chocolate',
      descripcion: 'Deliciosa torta de chocolate con relleno cremoso.',
      disponibilidad: 'Disponible',
      precio: 45,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 2,
      nombre: 'Torta de Vainilla',
      descripcion: 'Suave torta de vainilla con glaseado de fresa.',
      disponibilidad: 'Agotada',
      precio: 50,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 3,
      nombre: 'Torta de Zanahoria',
      descripcion: 'Torta de zanahoria con nueces y crema de queso.',
      disponibilidad: 'Disponible',
      precio: 55,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 4,
      nombre: 'Torta de Limón',
      descripcion: 'Fresca torta de limón con merengue suave.',
      disponibilidad: 'Disponible',
      precio: 40,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 5,
      nombre: 'Torta de Coco',
      descripcion: 'Exquisita torta de coco con cobertura de chocolate.',
      disponibilidad: 'Disponible',
      precio: 60,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 6,
      nombre: 'Torta de Frutas',
      descripcion: 'Torta fresca con una mezcla de frutas de temporada.',
      disponibilidad: 'Disponible',
      precio: 70,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 7,
      nombre: 'Torta de Café',
      descripcion: 'Torta de café con crema batida y granos de café.',
      disponibilidad: 'Disponible',
      precio: 65,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 8,
      nombre: 'Torta de Nutella',
      descripcion: 'Irresistible torta de Nutella con avellanas.',
      disponibilidad: 'Disponible',
      precio: 75,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 9,
      nombre: 'Torta de Red Velvet',
      descripcion: 'Torta de Red Velvet con crema de queso.',
      disponibilidad: 'Disponible',
      precio: 80,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 10,
      nombre: 'Torta de Almendra',
      descripcion: 'Deliciosa torta de almendra con glaseado de miel.',
      disponibilidad: 'Disponible',
      precio: 85,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
    {
      id: 11,
      nombre: 'Torta de Chocolate Blanco',
      descripcion: 'Torta de chocolate blanco con fresas frescas.',
      disponibilidad: 'Disponible',
      precio: 90,
      whatsapp: 1234567890,
      imagen: placeholderImage,
    },
  ];

  return (
    <div>
      <HeaderWithSearchbar title='Hola, ¿qué comprarás hoy?' />

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
          >
            <img
              className={styles.productImage}
              src={product.imagen}
              alt={product.nombre}
            />
            <div className={styles.productInfo}>
              <span className={styles.productName}>{product.nombre}</span>
              <div className={styles.priceLike}>
                <HeartIcon />
                <span className={styles.price}>{product.precio}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
