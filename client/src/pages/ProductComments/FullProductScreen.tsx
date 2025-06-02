// // ProductDetailPage.tsx (Actualizado para leer productId de la URL)
// import React, { useState, useEffect } from "react";
// import { useParams } from 'react-router-dom'; // Importa useParams
// import ProductImageDisplay from "../../components/ui/ProductImageDisplay";
// import ProductDescriptionArea from "../../components/ui/ProductDescriptionArea";
// import RatingAndCommentSection from "../../components//ui/RatingAndCommentSection";
// import styles from "./FullProductScreen.module.css";

// interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   altText: string;
//   averageRating: number;
//   comments: {
//     id: string;
//     user: string;
//     text: string;
//     rating: number;
//     date: string;
//   }[];
// }

// // Ya no necesita una prop 'productId' si la lee directamente de la URL
// const ProductDetailPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>(); // Obtiene el ID del producto de la URL
//   const [product, setProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     // Asegúrate de que productId exista antes de intentar cargar datos
//     if (productId) {
//       console.log(`Cargando datos para el producto: ${productId}`);
//       // Simular la obtención de datos del producto y sus comentarios de la base de datos
//       setTimeout(() => {
//         // En una aplicación real, aquí harías una llamada a tu API:
//         // fetch(`/api/products/${productId}`)
//         //   .then(response => response.json())
//         //   .then(data => setProduct(data))
//         //   .catch(error => console.error("Error al cargar el producto:", error));

//         // Simulación de datos basada en el productId (puedes expandir esto para diferentes IDs)
//         const fetchedProduct: Product = {
//           id: productId, // Usa el ID de la URL
//           name: `Torta de Jamón ${productId}`, // Haz el nombre dinámico para pruebas
//           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies, lorem ut dictum faucibus, tortor neque cursus arcu, at scelerisque libero justo ut urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//           price: 45.0,
//           imageUrl: "/torta.jpeg", // Asegúrate que esta ruta sea correcta
//           altText: `Torta de jamón ${productId} con lechuga, tomate y cebolla`,
//           averageRating: 4.2,
//           comments: [
//             { id: "c1", user: "Cliente A", text: "¡Deliciosa, la mejor torta que he probado!", rating: 5, date: "2025-05-20" },
//             { id: "c2", user: "Cliente B", text: "Buen sabor, pero el pan estaba un poco seco. La recomiendo.", rating: 3, date: "2025-05-22" },
//             { id: "c3", user: "Cliente C", text: "Riquísima y llegó a tiempo.", rating: 5, date: "2025-05-25" },
//           ],
//         };
//         setProduct(fetchedProduct);
//       }, 1000);
//     }
//   }, [productId]); // El efecto se vuelve a ejecutar si el productId de la URL cambia

//   if (!product) {
//     return (
//       <div className={styles.loadingMessage}>
//         Cargando producto...
//       </div>
//     );
//   }

//   return (
//     <div className={styles.productDetailContent}>
//       {/* Columna de la imagen */}
//       <div className={styles.imageColumn}>
//         <ProductImageDisplay
//           imageUrl={product.imageUrl}
//           altText={product.altText}
//         />
//       </div>

//       {/* Columna de la descripción y sección de comentarios */}
//       <div className={styles.infoColumn}>
//         <ProductDescriptionArea
//           title={product.name}
//           description={product.description}
//         />
//         <RatingAndCommentSection
//           productId={product.id} // Asegúrate de pasar el ID real del producto aquí
//           initialComments={product.comments}
//           productAverageRating={product.averageRating}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

// FullProductScreen.tsx (ya no recibe productId como prop)


// ----------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------
// import React from 'react';
// import HeaderProductDetail from '../../components/ui/HeaderProductDetail';
// import ProductDetailPage from '../../components/layout/ProductDetailPage';
// import Navbar from '../../components/ui/Navbar';
// import styles from './FullProductScreen.module.css';

// const FullProductScreen: React.FC = () => {
//   return (
//     <div className={styles.pageContainer}>
//       <HeaderProductDetail />

//       <main className={styles.mainContent}>
//         {/* ProductDetailPage ahora lee el ID de la URL directamente */}
//         <ProductDetailPage />
//       </main>

//       <Navbar />
//     </div>
//   );
// };

// export default FullProductScreen;



import HeaderProductDetail from '../../components/ui/HeaderProductDetail';

import Navbar from '../../components/ui/Navbar';


export default function FullProductScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderProductDetail />
      <main style={{ flex: 1, padding: '20px' }}>
        {/* Aquí iría el componente ProductDetailPage que maneja la lógica del producto */}
      </main>
      <Navbar />
    </div>
  );
}