import React, { useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string; // Texto de marcador de posición (ej. "Buscar")
  onSearch: (searchTerm: string) => void; // Función que se llama cuando se realiza una búsqueda
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Buscar',
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm); // Llama a la función onSearch con el término actual
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Permite buscar también al presionar Enter
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type='text'
        className={styles.searchInput}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Para buscar con Enter
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
      >
        {/* Usamos un SVG para el icono de la lupa */}
        <img
          src='/icons/search.svg' // Ajusta esta ruta si tu SVG se llama diferente o está en otra subcarpeta de public/icons
          alt='Buscar'
          className={styles.searchIcon}
        />
      </button>
    </div>
  );
};

export default SearchBar;
