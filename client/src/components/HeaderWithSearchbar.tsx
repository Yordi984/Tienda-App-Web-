import FilterComponent from './FilterComponent';
import styles from './HeaderWithSearchbar.module.css';
import ButtonComponent from './ui/ButtonComponent';
import SearchBar from './ui/SearchBar';

interface HeaderWithSearchbarProps {
  title: string;
  categories: { label: string; value: string }[];
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filter: string) => void;
}

export default function HeaderWithSearchbar({
  title,
  categories,
  onSearch,
  onFilter,
}: HeaderWithSearchbarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.header__green}>
        <span className={styles.header__title}>{title}</span>
      </div>

      <div className={styles.header__other}>
        <FilterComponent
          label='Categorías'
          categories={categories}
          onFilter={(filter) => onFilter?.(filter)}
        />

        <ButtonComponent
          onClick={() => {
            window.location.href = '/CrearProductos';
          }}
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
