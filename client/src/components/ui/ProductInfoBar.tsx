import React, { useState } from 'react';
import styles from './ProductInfoBar.module.css';

// Asegúrate de que estas rutas sean correctas para tus SVGs.
// Por ejemplo: 'public/icons/heart-empty.svg' si están directamente en public/icons
import HeartEmptyIcon from '/icons/heart.svg'; // Asume que este es el corazón vacío (gris/contorno)
import HeartFilledIcon from '/icons/heart-filled.svg'; // Asume que este es el corazón lleno (rojo)

interface ProductInfoBarProps {
  name: string; // Nombre del producto a mostrar
  price: number; // Precio del producto
  isFavoriteInitially?: boolean; // Estado inicial de favorito (opcional, por defecto false)
  // Puedes añadir un onToggleFavorite si quieres que el componente padre se entere del cambio
  onToggleFavorite?: (productName: string, isNowFavorite: boolean) => void;
}

const ProductInfoBar: React.FC<ProductInfoBarProps> = ({
  name,
  price,
  isFavoriteInitially = false,
  onToggleFavorite,
}) => {
  // Estado local para controlar si el producto es favorito
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);

  // Función para cambiar el estado de favorito y ejecutar lógica externa
  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState); // Actualiza el estado local
    console.log(
      `Producto "${name}" marcado como ${newState ? 'favorito' : 'no favorito'}`,
    );

    // Si se proporciona la prop onToggleFavorite, la llamamos
    if (onToggleFavorite) {
      onToggleFavorite(name, newState);
    }
  };

  return (
    <div className={styles.infoBar}>
      {/* Nombre del producto */}
      <span className={styles.productName}>{name}</span>

      {/* Contenedor para el botón de favorito y el precio */}
      <div className={styles.actions}>
        {/* Botón para alternar el estado de favorito */}
        <button
          className={styles.favoriteButton}
          onClick={toggleFavorite}
        >
          {/* Muestra el icono de corazón lleno si es favorito, vacío si no */}
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
        {/* Precio del producto */}
        <span className={styles.price}>${price}</span>
      </div>
    </div>
  );
};

export default ProductInfoBar;
