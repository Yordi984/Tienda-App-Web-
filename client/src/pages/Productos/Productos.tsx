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
  // vendedor: Vendedor;
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);

  function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('http://localhost:3000/productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return await result.json();
    };

    fetchProducts()
      .then((data) => {
       console.log('Fetched products:', data);
        

        setProducts(
          data.map((product: Product) => ({
            ...product,
            precio: formatPrice(product.precio),
            imagen: product.imagen,
          })),
        );
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

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
              src={product.imagen || placeholderImage}
              onError={(e) => {
                e.currentTarget.src = placeholderImage; // Fallback to placeholder image
              }}
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
