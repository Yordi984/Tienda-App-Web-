import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      {/* Lista no ordenada para los elementos de navegación */}
      <ul className={styles.navList}>
        {/* Elemento de navegación para el icono de inicio */}
        <li className={styles.navItem}>
          {/* Enlace que lleva a la página de inicio */}
          <a
            href='/'
            className={styles.navLink}
          >
            {/* Imagen del icono de casa. La ruta es relativa a la carpeta 'public'. */}
            <img
              src='/icons/house.svg'
              alt='Home'
              className={styles.navIcon}
            />
          </a>
        </li>
        {/* Elemento de navegación para el icono de búsqueda */}
        <li className={styles.navItem}>
          {/* Enlace que lleva a la página de búsqueda */}
          <a
            href='/search'
            className={styles.navLink}
          >
            {/* Imagen del icono de búsqueda. La ruta es relativa a la carpeta 'public'. */}
            <img
              src='/icons/search.svg'
              alt='Search'
              className={styles.navIcon}
            />
          </a>
        </li>
        {/* Elemento de navegación para el icono de favoritos */}
        <li className={styles.navItem}>
          {/* Enlace que lleva a la página de favoritos */}
          <a
            href='/favorites'
            className={styles.navLink}
          >
            {/* Imagen del icono de corazón. La ruta es relativa a la carpeta 'public'. */}
            <img
              src='/icons/heart.svg'
              alt='Favorites'
              className={styles.navIcon}
            />
          </a>
        </li>
        {/* Elemento de navegación para el icono de perfil de usuario */}
        <li className={styles.navItem}>
          {/* Enlace que lleva a la página de perfil */}
          <a
            href='/profile'
            className={styles.navLink}
          >
            {/* Imagen del icono de usuario. La ruta es relativa a la carpeta 'public'. */}
            <img
              src='/icons/user-round.svg'
              alt='Profile'
              className={styles.navIcon}
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
