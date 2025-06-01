import nodemailer from "nodemailer";
import "dotenv/config";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email, // cambia esto
    pass: process.env.Pass, // usa una contraseña de aplicación
  },
});

export const enviarCorreoRecuperacion = async (
  correo: string,
  token: string
) => {
  const url = `http://localhost:3000/restablecer/${token}`;
  await transporter.sendMail({
    from: '"Soporte Plataforma" <TUCORREO@gmail.com>',
    to: correo,
    subject: "Recuperar contraseña",
    html: `<p>Haz clic aquí para restablecer tu contraseña: <a href="${url}">${url}</a></p>`,
  });
};
