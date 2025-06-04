import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        {/* Icono de inicio */}
        <li className={styles.navItem}>
          <a href='/productos' className={styles.navLink}>
            <img
              src='/icons/house.svg'
              alt='Inicio'
              className={styles.navIcon}
            />
          </a>
        </li>

        {/* Icono de búsqueda */}
        <li className={styles.navItem}>
          <a href='/productos' className={styles.navLink}>
            <img
              src='/icons/search.svg'
              alt='Búsqueda'
              className={styles.navIcon}
            />
          </a>
        </li>

        {/* Icono de favoritos */}
        <li className={styles.navItem}>
          <a href='/favoritos' className={styles.navLink}>
            <img
              src='/icons/heart.svg'
              alt='Favoritos'
              className={styles.navIcon}
            />
          </a>
        </li>

        {/* Icono de mis productos */}
        <li className={styles.navItem}>
          <a href='/mis_productos' className={styles.navLink}>
            <img
              src='https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/store.svg'
              alt='Mis Productos'
              className={styles.navIcon}
            />
          </a>
        </li>

        {/* Icono de perfil */}
        <li className={styles.navItem}>
          <a href='/perfil' className={styles.navLink}>
            <img
              src='/icons/user-round.svg'
              alt='Perfil'
              className={styles.navIcon}
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
