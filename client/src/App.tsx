import Navbar from "./components/ui/Navbar";
import HeaderComponent from "./components/ui/HeaderComponent";
import ButtonComponent from "./components/ui/ButtonComponent";
import SearchBar from "./components/ui/SearchBar";
import InputComponent from "./components/ui/InputComponent";
import ProductCard from "./components/ui/ProductCard";
import CreateAccountForm from "./components/layout/CreateAccountForm";
import ProductImageDisplay from "./components/ui/ProductImageDisplay";
import ProductDescriptionArea from "./components/ui/ProductDescriptionArea";
import { useState, useEffect } from "react";
import CommentInput from "./components/ui/CommentInput";
import ProductDetailPage from "./components/layout/ProductDetailPage";

type ProductData = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  altText: string;
  rating: number;
  comments: unknown[]; // You can further type comments if needed
};

function App() {
  const testImageUrl = "./public/torta.jpeg"; // <-- ¡Aquí está la URL de prueba!
  const testAltText = "Una deliciosa torta de prueba";

  const [productData, setProductData] = useState<ProductData | null>(null); // Datos del producto de la DB

  useEffect(() => {
    // Simular la obtención de datos del producto de la base de datos
    setTimeout(() => {
      setProductData({
        id: "prod123",
        name: "Torta de Jamón", // <--- Título de la DB
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies, lorem ut dictum faucibus, tortor neque cursus arcu, at scelerisque libero justo ut urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.", // <--- Descripción de la DB
        price: 45.0,
        imageUrl: "/images/torta-prueba.jpg", // URL de imagen de prueba
        altText: "Torta de jamón con lechuga, tomate y cebolla",
        rating: 4,
        comments: [],
      });
    }, 1000);
  }, []);

  if (!productData) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Cargando producto...
      </div>
    );
  }

  return (
    <>
      <HeaderComponent text="Hola ¿Qué compraras hoy?" />
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
      <Navbar />

      <ProductDescriptionArea
        title={productData.name} // Pasando el título de la DB
        description={productData.description} // Pasando la descripción de la DB
      />
      <CommentInput
        productId={productData.id}
        placeholder="Escribe tu comentario aquí..."
        onCommentSubmit={(id, text, rating) =>
          console.log(
            `Comentario enviado para ${id}: ${text} con ${rating} estrellas`
          )
        }
      ></CommentInput>

      <ProductImageDisplay imageUrl={testImageUrl} altText={testAltText} />

      <ProductDetailPage />

      {/* Aquí va el nuevo componente RatingAndCommentSection */}

      <CreateAccountForm />
    </>
  );
}

export default App;
