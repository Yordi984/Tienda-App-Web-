import React, { useState, useEffect } from "react";
import ProductImageDisplay from "../ui/ProductImageDisplay";
import ProductDescriptionArea from "../ui/ProductDescriptionArea";
import RatingAndCommentSection from "../ui/RatingAndCommentSection"; // Importa el nuevo componente

// Define la interfaz para el producto (opcional, pero buena práctica)
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  altText: string;
  averageRating: number; // Nueva propiedad para la calificación promedio
  comments: {
    id: string;
    user: string;
    text: string;
    rating: number;
    date: string;
  }[]; // Comentarios que vienen de la DB
}

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null); // Usamos la interfaz Product

  useEffect(() => {
    // Simular la obtención de datos del producto y sus comentarios de la base de datos
    setTimeout(() => {
      const fetchedProduct: Product = {
        id: "prod123",
        name: "Torta de Jamón",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies, lorem ut dictum faucibus, tortor neque cursus arcu, at scelerisque libero justo ut urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 45.0,
        imageUrl: "/torta.jpeg",
        altText: "Torta de jamón con lechuga, tomate y cebolla",
        averageRating: 4.2, // Calificación promedio simulada
        comments: [
          // Comentarios que vienen de la base de datos para este producto
          {
            id: "c1",
            user: "Cliente A",
            text: "¡Deliciosa, la mejor torta que he probado!",
            rating: 5,
            date: "2025-05-20",
          },
          {
            id: "c2",
            user: "Cliente B",
            text: "Buen sabor, pero el pan estaba un poco seco. La recomiendo.",
            rating: 3,
            date: "2025-05-22",
          },
          {
            id: "c3",
            user: "Cliente C",
            text: "Riquísima y llegó a tiempo.",
            rating: 5,
            date: "2025-05-25",
          },
        ],
      };
      setProduct(fetchedProduct);
    }, 1000);
  }, []);

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Cargando producto...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "30px",
        padding: "20px",
      }}
    >
      {/* Columna de la imagen */}
      <div style={{ flex: "1 1 400px", maxWidth: "400px" }}>
        <ProductImageDisplay
          imageUrl={product.imageUrl}
          altText={product.altText}
        />
      </div>

      {/* Columna de la descripción y sección de comentarios */}
      <div
        style={{
          flex: "1 1 450px",
          maxWidth: "450px",
          padding: "0 0px 20px 0px",
        }}
      >
        <ProductDescriptionArea
          title={product.name}
          description={product.description}
        />

        {/* Aquí va el nuevo componente RatingAndCommentSection */}
        <RatingAndCommentSection
          productId={product.id}
          initialComments={product.comments} // Pasa los comentarios existentes de la DB
          productAverageRating={product.averageRating} // Pasa la calificación promedio
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
