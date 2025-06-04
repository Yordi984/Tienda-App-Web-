// src/pages/Productos.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import placeholderImage from '../../assets/images/placeholder.jpg';
import HeaderWithSearchbar from '../../components/HeaderWithSearchbar';
import { HeartIcon } from '../../components/icons';
import NavBar from '../../components/ui/Navbar';
import { getProducts, type Product } from '../../services/api/products';
import { formatPrice } from '../../utils/product';
import styles from './Productos.module.css';

type FormattedProduct = Omit<Product, 'precio'> & {
  precio: string;
};

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<FormattedProduct[]>([]);

  const categories = [
    { label: 'Comida', value: 'comida' },
    { label: 'Ropa', value: 'ropa' },
    { label: 'Tecnología', value: 'tecnologia' },
    { label: 'Accesorios', value: 'accesorios' },
    { label: 'Otros', value: 'otros' },
  ];

  useEffect(() => {
    console.log('Fetching products with:', {
      searchTerm: searchTerm ?? 'none',
      selectedCategory: selectedCategory ?? 'none',
    });

    getProducts({
      searchTerm: searchTerm ?? undefined,
      category: selectedCategory ?? undefined,
    })
      .then((data) => {
        console.log('Products fetched:', data);

        const formattedData = data.map((product: Product) => ({
          ...product,
          precio: formatPrice(product.precio),
        }));
        console.log('Formatted products:', formattedData);

        setProducts(formattedData);
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
