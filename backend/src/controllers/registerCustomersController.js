//Importo librerias
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

import customersModel from "../models/Customers.js";
import { config } from "../config.js";

const registerCustomersController = {};

registerCustomersController.registerCustomer = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    dui
  } = req.body;

  try {
    // Verifico si ya existe
    const existCustomer = await customersModel.findOne({ email });
    if (existCustomer) {
      return res.json({ message: "Customer already exists" });
    }

    // Encripto la contra
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardo
    const newClient = new customersModel({
        name,
        email,
        password: passwordHash,
        phone,
        address,
        dui
    });

    await newClient.save();

    // Codigo de verificacion
    const verficationCode = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutos

    // TOKEN
    const tokenCode = jsonwebtoken.sign(
      {
        // Lo que guardo
        email,
        verficationCode,
        expiresAt,
      },
      // Secreto
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    // Guardo el token en una cookie
    res.cookie("verificationToken", tokenCode, {
      maxAge: 15 * 60 * 1000, // Duración de la cookie: 15 minutos
    });

    // Enviar correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });

    // Remitente
    const mailOptions = {
      from: config.email.user,
      to: email,
      subject: "Verificacion de correo | CineMark El Salvador",
      text: `Para verificar que eres dueño de la cuenta, utiliza este codigo: ${verficationCode}\n Este codigo expira en 15 minutos\n`,
    };

    // Mando correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("error" + error);
      res.json({ message: "Email sent" });
    });

    res.json({ message: "Customer registered, Please verify your email" });
  } catch (error) {
    res.json({ message: "error" + error });
  }
};

registerCustomersController.verifyCodeEmail = async (req, res) => {
  const { verficationCode } = req.body;
  // Accedo al token
  const token = req.cookies.verificationToken;

  if (!token) {
    return res.json({ message: "Please, register your account first" });
  }

  try {
    // Verifico token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verficationCode: storedCode } = decoded;

    // Comparo el codigo
    if (verficationCode !== storedCode) {
      return res.json({ message: "Invalid verification code" });
    }

    // busco al cliente
    const client = await customersModel.findOne({ email });
    if (!client) {
      return res.json({ message: "Customer not found" });
    }

    await client.save();

    // Quito lo del token
    res.clearCookie("verificationToken");

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.json({ message: "error" + error });
  }
};

export default registerCustomersController;