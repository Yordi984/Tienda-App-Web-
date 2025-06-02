import React from 'react';
import styles from './HeaderProductDetail.module.css';
import ButtonComponent from './ButtonComponent';  // Asegúrate de la ruta correcta
import SearchBar from './SearchBar';              // Asegúrate de la ruta correcta

const HeaderProductDetail: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Calificar</h1>
      </div>
      <div className={styles.rightContainer}>
        <ButtonComponent text="Vender" color={'green'} />
        <SearchBar onSearch={() => { /* TODO: implement search functionality */ }} />
      </div>
    </header>
  );
};

export default HeaderProductDetail;
