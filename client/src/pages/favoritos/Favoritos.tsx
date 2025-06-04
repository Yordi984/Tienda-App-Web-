import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import HeaderComponent from '../../components/ui/HeaderComponent';
import NavBar from '../../components/ui/Navbar';
import {
  changeFavorite,
  getFavoriteProducts,
} from '../../services/api/products';
import type { Product } from '../../types';
import styles from './Favoritos.module.css';

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]);

  const vendedorId = localStorage.getItem('vendedorId');

  useEffect(() => {
    if (vendedorId) {
      getFavoriteProducts(parseInt(vendedorId, 10))
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setProducts([]);
        });
    }
  }, [vendedorId]);

  const handleFavorite = (product: Product) => {
    if (vendedorId) {
      changeFavorite(parseInt(vendedorId, 10), product.id, () => {
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <HeaderComponent text='Mis favoritos' />

      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          >
            <ProductCard.Image
              product={product}
              src={product.imagen}
              alt={product.nombre}
            />
            <ProductCard.InfoWithLikeIcon
              product={product}
              isFavorite
              onFavorite={() => handleFavorite(product)}
            />
          </ProductCard>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
