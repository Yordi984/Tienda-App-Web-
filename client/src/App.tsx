import Navbar from './components/ui/Navbar';
// import HeaderComponent from "./components/ui/HeaderComponent";
// import ButtonComponent from "./components/ui/ButtonComponent";
// import SearchBar from "./components/ui/SearchBar";
// import InputComponent from "./components/ui/InputComponent";
// import ProductCard from "./components/ui/ProductCard";




function App() {  
  return (
    <>
      {/* <HeaderComponent text="Hola ¿Qué compraras hoy?" />
      <ButtonComponent
        text="Comprar"
        color="green"
        onClick={() => console.log("Comprar")}
      />
      <SearchBar
        onSearch={(searchTerm) => console.log("Buscando:", searchTerm)}
      />
      <InputComponent
        placeholder="Escribe algo..."
        type="text"
        onChange={(e) => console.log("Input cambiado:", e.target.value)}
      />
      <ProductCard
        imageUrl="https://via.placeholder.com/150"
        altText="Producto de ejemplo"
        productName="Producto Ejemplo"
        productPrice={29.99}
        isFavoriteInitially={false}
        onToggleFavorite={(name, isNowFavorite) =>
          console.log(`Producto ${name} es ahora favorito: ${isNowFavorite}`)
        }
        onClick={() => console.log("Producto clickeado")}
      />
      <Navbar /> */}
      
      {/* Aquí puedes agregar más componentes según sea necesario */}
      {/* Por ejemplo, si tienes un componente de productos o una lista de productos */}
      {/* <ProductList /> */}
       
      
      <Navbar />

      
    </>
  );
}

export default App;
