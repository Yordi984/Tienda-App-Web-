import styles from './HeaderWithSearchbar.module.css';
import ButtonComponent from './ui/ButtonComponent';
import SearchBar from './ui/SearchBar';

interface HeaderWithSearchbarProps {
  title: string;
  onSearch?: (searchTerm: string) => void;
}

export default function HeaderWithSearchbar({
  title,
  onSearch,
}: HeaderWithSearchbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__green}>
        <span className={styles.header__title}>{title}</span>
      </div>

      <div className={styles.header__other}>
        <div className={styles.headerCategories}>
          <span className={styles.headerCategories__categoriesTitle}>
            Categorías
          </span>

          <ul className={styles.headerCategories__categoriesList}>
            <li className={styles.headerCategories__categoryItemActive}>
              Todo
            </li>
            <li className={styles.headerCategories__categoryItem}>Comida</li>
            <li className={styles.headerCategories__categoryItem}>Ropa</li>
            <li className={styles.headerCategories__categoryItem}>
              Accesorios
            </li>
            <li className={styles.headerCategories__categoryItem}>Dulces</li>
          </ul>
        </div>

        <ButtonComponent
          text='Vender'
          color='green'
        />

        <SearchBar
          placeholder='Buscar'
          onSearch={(searchTerm) => onSearch?.(searchTerm)}
        />
      </div>
    </header>
  );
}
