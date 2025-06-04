import React, { useState } from 'react';
import styles from './ProductInfoBar.module.css';

import HeartEmptyIcon from '/icons/heart.svg';
import HeartFilledIcon from '/icons/heart-filled.svg';

interface ProductInfoBarProps {
  name: string;
  price: number;
  isFavoriteInitially?: boolean;
  onToggleFavorite?: (productName: string, isNowFavorite: boolean) => void;
  showFavoriteIcon?: boolean; // 👈 NUEVA PROP
}

const ProductInfoBar: React.FC<ProductInfoBarProps> = ({
  name,
  price,
  isFavoriteInitially = false,
  onToggleFavorite,
  showFavoriteIcon = true, // Valor por defecto: mostrar
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (onToggleFavorite) {
      onToggleFavorite(name, newState);
    }
  };

  return (
    <div className={styles.infoBar}>
      <span className={styles.productName}>{name}</span>

      <div className={styles.actions}>
        {showFavoriteIcon && (
          <button
            className={styles.favoriteButton}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <img
                src={HeartFilledIcon}
                alt='Favorito'
                className={styles.heartIcon}
              />
            ) : (
              <img
                src={HeartEmptyIcon}
                alt='No favorito'
                className={styles.heartIcon}
              />
            )}
          </button>
        )}
        <span className={styles.price}>${price}</span>
      </div>
    </div>
  );
};

export default ProductInfoBar;
