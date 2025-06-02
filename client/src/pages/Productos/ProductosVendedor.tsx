import { useEffect, useState } from 'react';
import placeholderImage from '../../assets/images/placeholder.jpg';
import HeaderWithSearchbar from '../../components/HeaderWithSearchbar';
import { HeartIcon } from '../../components/icons';
import NavBar from '../../components/ui/Navbar';
import styles from './Productos.module.css';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  disponibilidad: string;
  precio: number;
  whatsapp: number;
  imagen?: string;
}

export default function MisProductos() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vendedorId, setVendedorId] = useState<string | null>(null);

  useEffect(() => {
    // Obtener vendedorId y validar que no sea null o 'null'
    const rawVendedorId = localStorage.getItem('vendedorId');
    if (rawVendedorId && rawVendedorId !== 'null' && rawVendedorId.trim() !== '') {
      setVendedorId(rawVendedorId);
    } else {
      setError('No se encontró el ID de vendedor. Por favor inicia sesión.');
    }
  }, []);

  useEffect(() => {
    if (!vendedorId) return;

    const fetchMisProductos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3000/mis-productos`);

        if (!response.ok) {
          // Leer el mensaje de error que devuelve el backend
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener los productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err: unknown) {
        console.error('Error al obtener mis productos:', err);
        if (err instanceof Error) {
          setError(err.message || 'No se pudieron cargar los productos.');
        } else {
          setError('No se pudieron cargar los productos.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMisProductos();
  }, [vendedorId]);

  function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  return (
    <div>
      <HeaderWithSearchbar title="Mis productos publicados" />

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: 'center' }}>Cargando productos...</p>
      ) : productos.length === 0 && !error ? (
        <p style={{ textAlign: 'center' }}>No tienes productos publicados.</p>
      ) : (
        <div className={styles.productGrid}>
          {productos.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                className={styles.productImage}
                src={product.imagen || placeholderImage}
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
                alt={product.nombre}
              />
              <div className={styles.productInfo}>
                <span className={styles.productName}>{product.nombre}</span>
                <div className={styles.priceLike}>
                  <HeartIcon />
                  <span className={styles.price}>{formatPrice(product.precio)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <NavBar />
    </div>
  );
}
