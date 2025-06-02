import React from 'react';
import './Favoritos.css'; // CSS xd
import NavBar from '../../components/ui/Navbar';
import HeaderComponent from '../../components/ui/HeaderComponent';

function Favoritos() {
  return (
    <div className="favorites-page">
      <HeaderComponent text='Favoritos' />

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

      <NavBar />
    </div>
  );
}

export default Favoritos; 