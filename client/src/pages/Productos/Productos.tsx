// src/pages/Productos.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  precio: string;
  whatsapp: number;
  imagen?: string;
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);

  function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  function handleSearch(searchTerm: string) {
    fetch(
      `http://localhost:3000/productos?q=${encodeURIComponent(searchTerm)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Search results:', data);
        setProducts(
          data.map((product: { precio: number; imagen: string }) => ({
            ...product,
            precio: formatPrice(product.precio),
            imagen: product.imagen,
          })),
        );
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await fetch('http://localhost:3000/productos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
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
            precio: formatPrice(Number(product.precio)),
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
      <HeaderWithSearchbar
        title='Hola, ¿qué comprarás hoy?'
        onSearch={handleSearch}
      />

      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link
            to={`/producto/${product.id}`}
            key={product.id}
            className={styles.productCard}
          >
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
                <span className={styles.price}>{product.precio}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
