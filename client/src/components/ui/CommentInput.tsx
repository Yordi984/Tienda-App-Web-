import React, { useState } from "react";
import styles from "./CommentInput.module.css";
import ButtonComponent from "../ui/ButtonComponent"; // Asegúrate de que la ruta sea correcta.
// Si ButtonComponent no exporta ButtonColor, simplemente quítalo de aquí.

interface CommentInputProps {
  productId: string; // ID del producto al que se asociará el comentario
  onCommentSubmit: (productId: string, comment: string, rating: number) => void; // Función para enviar el comentario y la calificación
  placeholder?: string;
  initialRating?: number;
}

const CommentInput: React.FC<CommentInputProps> = ({
  productId,
  onCommentSubmit,
  placeholder = "Comentar",
  initialRating = 0,
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [currentRating, setCurrentRating] = useState<number>(initialRating); // Estado para la calificación actual (0-5)
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  const showNotification = (
    message: string,
    type: "success" | "error" | ""
  ) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setCurrentRating(rating);
    console.log(`Calificación seleccionada: ${rating} estrellas`);
  };

  const handleSubmit = () => {
    if (commentText.trim() === "" && currentRating === 0) {
      showNotification(
        "Por favor, escribe un comentario o selecciona una calificación.",
        "error"
      );
      return;
    }
    if (currentRating === 0) {
      showNotification(
        "Por favor, selecciona una calificación antes de comentar.",
        "error"
      );
      return;
    }

    console.log(
      `Enviando comentario para producto ${productId}: "${commentText}" con ${currentRating} estrellas`
    );

    // Llama a la función proporcionada por la prop para enviar los datos al padre
    onCommentSubmit(productId, commentText, currentRating);

    // Simulación de éxito/error de la API
    const success = Math.random() > 0.3; // 70% de éxito
    if (success) {
      showNotification("¡Gracias por tu comentario y calificación!", "success");
      setCommentText(""); // Limpiar el textarea después del envío exitoso
      setCurrentRating(0); // Resetear la calificación
    } else {
      showNotification(
        "Error al enviar el comentario. Inténtalo de nuevo.",
        "error"
      );
    }
  };

  return (
    <div className={styles.commentInputContainer}>
      {notification.message && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      {/* Placeholder o implementación básica de las estrellas de calificación */}
      <div className={styles.ratingStarsPlaceholder}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`${styles.star} ${
              star <= currentRating ? styles.starFilled : styles.starEmpty
            }`}
            onClick={() => handleRatingChange(star)}
          >
            &#9733; {/* Unicode para una estrella */}
          </span>
        ))}
      </div>

      <textarea
        className={styles.commentTextArea}
        placeholder={placeholder}
        value={commentText}
        onChange={handleTextChange}
        rows={4} // Número de filas visibles por defecto
      />

      {/* AHORA USAMOS TU BUTTONCOMPONENT EXISTENTE */}
      <ButtonComponent
        text="Calificar"
        color="green" // Asumiendo que 'green' es un color válido en tu ButtonComponent
        onClick={handleSubmit}
      />
    </div>
  );
};

export default CommentInput;
