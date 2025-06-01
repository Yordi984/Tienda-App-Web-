import React from "react";
import styles from "./ProductDescriptionArea.module.css";

interface ProductDescriptionAreaProps {
  title: string; // El título del producto (ej. "Torta")
  description: string; // La descripción detallada del producto (ej. "Lorem ipsum...")
}

const ProductDescriptionArea: React.FC<ProductDescriptionAreaProps> = ({
  title,
  description,
}) => {
  return (
    <div className={styles.descriptionContainer}>
      <h2 className={styles.productTitle}>{title}</h2>
      <p className={styles.productDescription}>{description}</p>
    </div>
  );
};

export default ProductDescriptionArea;
