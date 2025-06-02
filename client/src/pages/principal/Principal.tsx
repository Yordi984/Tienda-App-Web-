import React from 'react';
import './Principal.css';
import HeaderComponent from '../../components/ui/HeaderComponent';
import SearchBar from '../../components/ui/SearchBar';

function Principal() {
  // Datos de ejemplo para los productos (basados en la imagen)
  const products = [
    { id: 1, name: 'Torta', price: 45, imageUrl: '/torta.jpeg' },
    { id: 2, name: 'Gorra', price: 200, imageUrl: '/placeholder-gorra.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 3, name: 'Gomitas', price: 10, imageUrl: '/placeholder-gomitas.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 4, name: 'Torta', price: 45, imageUrl: '/torta.jpeg' },
    { id: 5, name: 'Gorra', price: 200, imageUrl: '/placeholder-gorra.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 6, name: 'Gomitas', price: 10, imageUrl: '/placeholder-gomitas.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 7, name: 'Termo', price: 175, imageUrl: '/placeholder-termo.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 8, name: 'Xbox series X', price: 8000, imageUrl: '/placeholder-xbox.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 9, name: 'Canva Pro', price: 50, imageUrl: '/placeholder-canva.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 10, name: 'Termo', price: 175, imageUrl: '/placeholder-termo.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 11, name: 'Xbox series X', price: 8000, imageUrl: '/placeholder-xbox.jpeg' }, // Reemplazar con la ruta real si existe
    { id: 12, name: 'Canva Pro', price: 50, imageUrl: '/placeholder-canva.jpeg' }, // Reemplazar con la ruta real si existe
  ];

  const categories = ['Todo', 'Comida', 'Ropa', 'Accesorios', 'Dulces'];

  return (
    <div className="principal-page">
      <header className="principal-header-new">
        <HeaderComponent text="Hola ¿Qué compraras hoy?" />
        <div className="header-bottom">
          <button className="sell-button">Vender</button>
          <div className="search-bar-container">
            <SearchBar onSearch={(searchTerm) => console.log('Buscando:', searchTerm)} />
          </div>
        </div>
        <div className="categories-bar">
          {categories.map(category => (
            <button key={category} className="category-button">{category}</button>
          ))}
        </div>
      </header>

      <main className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price}</span>
              {/* Icono de corazón - puedes usar una imagen SVG similar a la de favoritos */}
              <img src="/icons/heart.svg" alt="Favorite" className="favorite-icon" style={{ width: '16px', height: '16px' }} />
            </div>
          </div>
        ))}
      </main>

      <footer className="navigation-bar">
        {/* Iconos de navegación: Casa, Buscar, Favoritos, Perfil */}
        <div className="nav-icon"><img src="/icons/house.svg" alt="Home" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/search.svg" alt="Search" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/heart.svg" alt="Favorites" style={{ width: '24px', height: '24px' }} /></div>
        <div className="nav-icon"><img src="/icons/user-round.svg" alt="Profile" style={{ width: '24px', height: '24px' }} /></div>
      </footer>
    </div>
  );
}

export default Principal; 