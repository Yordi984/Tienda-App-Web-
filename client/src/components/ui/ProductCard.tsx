// ProductCard.tsx
import React from 'react';
import styles from './ProductCard.module.css';
import ProductInfoBar from './ProductInfoBar';

interface ProductCardProps {
  imageUrl: string;
  altText: string;
  productName: string;
  productPrice: number;
  isFavoriteInitially?: boolean;
  productoId: number; // 👈 Necesitamos el ID del producto
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  altText,
  productName,
  productPrice,
  isFavoriteInitially,
  productoId,
  onClick,
}) => {
  const handleToggleFavorite = async () => {
    const vendedorId = localStorage.getItem('vendedorId');

    if (!vendedorId) {
      alert('Debes iniciar sesión para marcar favoritos.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/favorito/${productoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendedorId: Number(vendedorId) }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Error al actualizar favorito');
      }

      console.log(data.message);
    } catch (error) {
      console.error('Error al marcar como favorito:', error);
    }
  };

  return (
    <div className={styles.productCard} onClick={onClick}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={altText} className={styles.productImage} />
      </div>

      <ProductInfoBar
        name={productName}
        price={productPrice}
        isFavoriteInitially={isFavoriteInitially}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default ProductCard;
