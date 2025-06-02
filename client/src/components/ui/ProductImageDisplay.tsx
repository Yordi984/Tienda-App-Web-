import React from "react";
import styles from "./ProductImageDisplay.module.css";

interface ProductImageDisplayProps {
  imageUrl: string;
  altText: string;
}

const ProductImageDisplay: React.FC<ProductImageDisplayProps> = ({
  imageUrl,
  altText,
}) => {
  return (
    <div className={styles.imageContainer}>
      <img src={imageUrl} alt={altText} className={styles.productImage} />
    </div>
  );
};

export default ProductImageDisplay;
