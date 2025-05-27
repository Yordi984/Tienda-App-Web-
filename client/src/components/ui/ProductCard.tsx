import React from "react";
import styles from "./ProductCard.module.css";
import ProductInfoBar from "./ProductInfoBar"; // Importa el componente de la barra de información del producto

interface ProductCardProps {
  imageUrl: string; // URL de la imagen del producto
  altText: string; // Texto alternativo para la imagen
  productName: string; // Nombre del producto (pasado a ProductInfoBar)
  productPrice: number; // Precio del producto (pasado a ProductInfoBar)
  isFavoriteInitially?: boolean; // Estado inicial del favorito (pasado a ProductInfoBar)
  // Opcional: Función para cuando el usuario alterna el favorito (pasado a ProductInfoBar)
  onToggleFavorite?: (name: string, isNowFavorite: boolean) => void;
  onClick?: () => void; // Opcional: Función para cuando se hace clic en toda la tarjeta
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  altText,
  productName,
  productPrice,
  isFavoriteInitially,
  onToggleFavorite,
  onClick,
}) => {
  return (
    <div className={styles.productCard} onClick={onClick}>
      {/* Contenedor de la imagen */}
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={altText} className={styles.productImage} />
      </div>

      {/* Componente ProductInfoBar reutilizado */}
      <ProductInfoBar
        name={productName}
        price={productPrice}
        isFavoriteInitially={isFavoriteInitially}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default ProductCard;
