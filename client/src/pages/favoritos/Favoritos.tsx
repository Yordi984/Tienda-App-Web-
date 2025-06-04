'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import HeaderComponent from '../../components/ui/HeaderComponent';
import Navar from '../../components/ui/Navbar';
import { changeFavorite } from '../../services/api/products';
import type { Product } from '../../types';

export default function MisProductos() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const vendedorId = localStorage.getItem('vendedorId');

  useEffect(() => {
    if (!vendedorId) {
      setError('No se encontró el ID del vendedor.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/mis-favoritos/${vendedorId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then((data) => setProductos(data.favoritos ?? data))
      .catch((err) => {
        console.error(err);
        setError('Error al cargar productos.');
      })
      .finally(() => setLoading(false));
  }, [vendedorId]);

  const handleFavorite = (product: Product) => {
    changeFavorite(product, () => {
      window.location.reload();
    });
  };

  return (
    <div className='p-4'>
      <HeaderComponent text='Mis Favoritos' />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {!loading && !error && productos.length === 0 && (
          <p style={{ display: 'flex', justifyItems: 'center' }}>
            No tienes productos favoritos
          </p>
        )}
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            product={producto}
          >
            <ProductCard.Image
              product={producto}
              src={producto.imagen}
              alt={producto.nombre}
            />
            <ProductCard.InfoWithLikeIcon
              product={producto}
              isFavorite
              onFavorite={() => handleFavorite(producto)}
            />
          </ProductCard>
        ))}
      </div>
      <Navar />
    </div>
  );
}
