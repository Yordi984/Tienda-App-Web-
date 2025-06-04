import { Link } from 'react-router-dom';
import placeholderImage from '../assets/images/placeholder.jpg';
import type { Product } from '../services/api/products';
import { formatPrice } from '../utils/product';
import styles from './ProductCard.module.css';
import { HeartIcon } from './icons';

interface ProductCardProps {
  product: Product;
  children?: React.ReactNode;
}

export default function ProductCard({ product, children }: ProductCardProps) {
  return (
    <div
      className={styles.productCard}
      key={product.id}
    >
      {children}
    </div>
  );
}

ProductCard.displayName = 'ProductCard';

function ProductCardImage({
  product,
  src,
  alt,
}: {
  product: Product;
  src?: string;
  alt: string;
}) {
  return (
    <Link to={`/producto/${product.id}`}>
      <img
        className={styles.productImage}
        src={src || placeholderImage}
        onError={(e) => {
          e.currentTarget.src = placeholderImage;
        }}
        alt={alt}
      />
    </Link>
  );
}

function ProductCardInfo({ product }: { product: Product }) {
  return (
    <div className={styles.productInfo}>
      <span className={styles.productName}>{product.nombre}</span>

      <div className={styles.priceLike}>
        <span className={styles.price}>{formatPrice(product.precio)}</span>
      </div>
    </div>
  );
}

ProductCardInfo.displayName = 'ProductCardInfo';

function ProductCardInfoWithLikeIcon({
  product,
  isFavorite = false,
  onFavorite,
}: {
  product: Product;
  isFavorite?: boolean;
  onFavorite?: () => void;
}) {
  return (
    <div className={styles.productInfo}>
      <span className={styles.productName}>{product.nombre}</span>

      <div className={styles.priceLike}>
        <span
          onClick={onFavorite}
          className={styles.likeIcon}
        >
          <HeartIcon fill={isFavorite} />
        </span>
        <span className={styles.price}>{formatPrice(product.precio)}</span>
      </div>
    </div>
  );
}

ProductCardInfoWithLikeIcon.displayName = 'ProductCardInfoWithLikeIcon';

ProductCard.Image = ProductCardImage;
ProductCard.Info = ProductCardInfo;
ProductCard.InfoWithLikeIcon = ProductCardInfoWithLikeIcon;
