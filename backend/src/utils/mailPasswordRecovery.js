import nodemailer from "nodemailer";
import { config } from "../config.js";

// Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (to, subject, body, html) => {
  try {
    const info = await transporter.sendMail({
      from: "danielgranados008@gmail.com",
      to, // Remitente
      subject, // Asunto
      body, // Cuerpo
      html, // HTML
    });

    return info;
  } catch (error) {
    console.log("error" + error);
  }
};

// HTML
const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: 'Poppins', sans-serif; text-align: center; background-color: #ffffff; padding: 25px; border: 1px solid #dcdcdc; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #c8102e; font-size: 26px; margin-bottom: 20px;">Recuperación de Contraseña - CineMark</h1>
        
        <p style="font-size: 16px; color: #000000; line-height: 1.6;">
            ¡Hola! Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación para continuar:
        </p>
        
        <div style="display: inline-block; padding: 12px 24px; margin: 25px 0; font-size: 20px; font-weight: bold; color: #ffffff; background-color: #c8102e; border-radius: 6px; border: 1px solid #a00d22;">
            ${code}
        </div>
        
        <p style="font-size: 14px; color: #333333; line-height: 1.5;">
            Este código es válido durante los próximos <strong>15 minutos</strong>. Si tú no solicitaste este correo, puedes ignorarlo con seguridad.
        </p>
        
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <footer style="font-size: 13px; color: #555555;">
            ¿Necesitas ayuda? Nuestro equipo de soporte está disponible en 
            <a href="mailto:soporte@cinemark.com" style="color: #c8102e; text-decoration: none;">soporte@cinemark.com</a>.
        </footer>
    </div>
    `;
};

export { sendEmail, HTMLRecoveryEmail };
