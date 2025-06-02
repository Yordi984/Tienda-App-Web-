import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email,
    pass: process.env.Pass,
  },
});

export const enviarCorreoRecuperacion = async (correo: string, token: string) => {
  const url = `http://localhost:5173/restablecer/${token}`;
  try {
    await transporter.sendMail({
      from: `"Soporte Plataforma" <${process.env.Email}>`,
      to: correo,
      subject: "Recuperar contraseña",
      html: `<p>Haz clic aquí para restablecer tu contraseña: <a href="${url}">${url}</a></p>`,
    });
    console.log("Correo enviado correctamente");
  } catch (error: any) {
    console.error("Error al enviar correo:", error?.message);
    console.error("Detalles:", error);
  }
};
