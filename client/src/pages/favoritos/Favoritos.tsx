import React from 'react';
import './Favoritos.css'; // CSS xd

function Favoritos() {
  return (
    <div className="favorites-page">
      <header className="favorites-header">
        <h1>Favoritos</h1>
      </header>

      <main className="favorites-content">
        {/* Aquí iría la lista de productos favoritos */}
        <div className="favorite-item">
          <img src="/torta.jpeg" alt="Torta" className="item-image" />
          <div className="item-details">
            <h2>Torta</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies, lorem ut dictum faucibus, tortor neque cursus arcu, at scelerisque libero justo ut urna.</p>
            <span className="item-price">$45</span>
            <button className="remove-button">Eliminar de favoritos</button>
          </div>
        </div>

        {/* Puedes repetir el bloque .favorite-item para cada producto favorito */}
      </main>

      <footer className="navigation-bar">
        {/* Iconos de navegación: Casa, Buscar, Favoritos, Perfil */}
        {/* Necesitarás componentes de icono reales aquí */}
        <div className="nav-icon"><img src="/icons/house.svg" alt="Home" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/search.svg" alt="Search" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/heart.svg" alt="Favorites" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/user-round.svg" alt="Profile" style={{ width: '24px', height: '24px' }} /></div>
      </footer>
    </div>
  );
}

export default Favoritos; 