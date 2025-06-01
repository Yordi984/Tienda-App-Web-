import React, { useState, useEffect } from "react";
import styles from "./RatingAndCommentSection.module.css"; // Crear este CSS
// Ajusta la ruta de importación según la ubicación real del archivo CommentInput.tsx
import CommentInput from "./CommentInput"; // O ajusta la ruta si está en otro subdirectorio

// Define una interfaz para un comentario, útil para tipado
interface ProductComment {
  id: string;
  user: string;
  text: string;
  rating: number;
  date: string;
}

interface RatingAndCommentSectionProps {
  productId: string; // El ID del producto al que pertenecen los comentarios
  initialComments?: ProductComment[]; // Comentarios existentes que vienen de la DB
  productAverageRating?: number; // Calificación promedio actual del producto (opcional)
}

const RatingAndCommentSection: React.FC<RatingAndCommentSectionProps> = ({
  productId,
  initialComments = [],
  productAverageRating = 0, // Usar como la calificación inicial de estrellas si se muestra
}) => {
  const [comments, setComments] = useState<ProductComment[]>(initialComments);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  // Si los comentarios iniciales cambian desde el padre, actualiza el estado interno
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const showNotification = (
    message: string,
    type: "success" | "error" | ""
  ) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  // Esta función se pasará a CommentInput y manejará el envío a la API
  const handleCommentSubmit = async (
    pId: string,
    comment: string,
    rating: number
  ) => {
    console.log(
      `[RatingAndCommentSection] Enviando a la API: Producto ID: ${pId}, Comentario: "${comment}", Calificación: ${rating}`
    );

    // Aquí es donde harías la llamada REAL a tu API para guardar el comentario
    // Ejemplo con fetch:
    // try {
    //   const response = await fetch(`/api/products/${pId}/comments`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ comment, rating })
    //   });
    //   const result = await response.json(); // La respuesta de la API puede incluir el comentario guardado
    //   if (response.ok) {
    //     // Si la API devuelve el comentario guardado con su ID, lo usamos
    //     const newComment = {
    //         id: result.id || `c${Date.now()}`, // Usar ID de la API o generar uno si no viene
    //         user: result.user || 'Usuario Anónimo', // Nombre de usuario real
    //         text: comment,
    //         rating: rating,
    //         date: result.date || new Date().toISOString().split('T')[0] // Fecha de la API
    //     };
    //     setComments((prevComments) => [...prevComments, newComment]);
    //     showNotification('¡Comentario enviado con éxito!', 'success');
    //   } else {
    //     showNotification(result.message || 'Error al enviar comentario.', 'error');
    //   }
    // } catch (error) {
    //   console.error('Error de red al enviar comentario:', error);
    //   showNotification('Error de conexión. Inténtalo de nuevo.', 'error');
    // }

    // --- Simulación de respuesta exitosa ---
    const success = Math.random() > 0.2; // 80% de éxito para simulación
    if (success) {
      const newSimulatedComment: ProductComment = {
        id: `c${Date.now()}-${Math.floor(Math.random() * 1000)}`, // ID único simulado
        user: "Usuario Actual", // En un sistema real, sería el nombre del usuario logueado
        text: comment,
        rating: rating,
        date: new Date().toISOString().split("T")[0], // Fecha en formato YYYY-MM-DD
      };
      setComments((prevComments) => [...prevComments, newSimulatedComment]);
      showNotification("¡Comentario enviado con éxito!", "success");
    } else {
      showNotification(
        "Error: No se pudo enviar el comentario. Intenta de nuevo.",
        "error"
      );
    }
  };

  return (
    <div className={styles.ratingCommentSectionContainer}>
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Aquí iría el componente RatingStars si lo hubiéramos separado,
          pero por ahora CommentInput ya maneja la selección de estrellas.
          Aquí se podría mostrar la calificación promedio del producto */}
      <h3 className={styles.sectionTitle}>Califica este producto:</h3>

      {/* Componente para la entrada de comentario y calificación */}
      <CommentInput
        productId={productId}
        onCommentSubmit={handleCommentSubmit} // Pasa la función que envía a la API
        initialRating={productAverageRating} // Puedes mostrar la calificación promedio como predeterminada para el input
      />

      {/* Sección para visualizar los comentarios existentes */}
      <div className={styles.existingCommentsArea}>
        <h3 className={styles.sectionTitle}>Comentarios de Clientes:</h3>
        {comments.length > 0 ? (
          comments.map((c) => (
            <div key={c.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.commentUser}>{c.user}</span>
                <span className={styles.commentDate}>({c.date})</span>
                <div className={styles.commentRating}>
                  {/* Estrellas para cada comentario */}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${styles.starDisplay} ${
                        star <= c.rating
                          ? styles.starFilledDisplay
                          : styles.starEmptyDisplay
                      }`}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              <p className={styles.commentText}>{c.text}</p>
            </div>
          ))
        ) : (
          <p className={styles.noCommentsMessage}>
            Aún no hay comentarios para este producto.
          </p>
        )}
      </div>
    </div>
  );
};

export default RatingAndCommentSection;
