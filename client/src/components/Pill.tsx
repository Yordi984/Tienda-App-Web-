import styles from './Pill.module.css';

export default function Pill() {
  return (
    <div className={styles.headerCategories}>
      <span className={styles.headerCategories__categoriesTitle}>
        Categorías
      </span>

      <ul className={styles.headerCategories__categoriesList}>
        <li className={styles.headerCategories__categoryItemActive}>Todo</li>
        <li className={styles.headerCategories__categoryItem}>Comida</li>
        <li className={styles.headerCategories__categoryItem}>Ropa</li>
        <li className={styles.headerCategories__categoryItem}>Accesorios</li>
        <li className={styles.headerCategories__categoryItem}>Dulces</li>
      </ul>
    </div>
  );
}
