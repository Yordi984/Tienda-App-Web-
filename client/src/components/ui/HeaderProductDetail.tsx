import React from 'react';
import styles from './HeaderProductDetail.module.css';
import ButtonComponent from './ButtonComponent';  // Asegúrate de la ruta correcta
import SearchBar from './SearchBar';              // Asegúrate de la ruta correcta

const HeaderProductDetail: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Hola ¿Qué compraras hoy?</h1>
      </div>
      <div className={styles.rightContainer}>
       <ButtonComponent onClick={() => {
            window.location.href = '/CrearProductos';
          }} text={'Vender'} color={'green' }/>

        <SearchBar onSearch={() => { /* TODO: implement search functionality */ }} />
      </div>
    </header>
  );
};

export default HeaderProductDetail;
