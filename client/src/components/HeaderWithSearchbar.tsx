import styles from './HeaderWithSearchbar.module.css';
import Pill from './Pill';
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
        <Pill />

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
