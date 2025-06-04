// src/pages/Productos.tsx
import { useEffect, useState } from 'react';
import HeaderWithSearchbar from '../../components/HeaderWithSearchbar';
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/ui/Navbar';
import { changeFavorite, getProducts } from '../../services/api/products';
import type { Product } from '../../types';
import styles from './Productos.module.css';

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const vendedorId = localStorage.getItem('vendedorId');

  const categories = [
    { label: 'Comida', value: 'comida' },
    { label: 'Ropa', value: 'ropa' },
    { label: 'Tecnología', value: 'tecnologia' },
    { label: 'Accesorios', value: 'accesorios' },
    { label: 'Otros', value: 'otros' },
  ];

  useEffect(() => {
    getProducts({
      searchTerm: searchTerm ?? undefined,
      category: selectedCategory ?? undefined,
    })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, [searchTerm, selectedCategory]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    console.log(`Search term updated: ${searchTerm}`);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    console.log(`Category selected: ${category}`);
  };

  const handleFavorite = (product: Product) => {
    if (vendedorId) {
      changeFavorite(parseInt(vendedorId, 10), product.id, () => {
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <HeaderWithSearchbar
        title='Hola, ¿qué comprarás hoy?'
        categories={categories}
        onSearch={handleSearch}
        onFilter={handleFilter}
      />

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
              isFavorite={product.vendedoresFavoritos.some(
                (vendedor) => vendedor.id === parseInt(vendedorId || '', 10),
              )}
              onFavorite={() => handleFavorite(product)}
            />
          </ProductCard>
        ))}
      </div>

      <NavBar />
    </div>
  );
}
