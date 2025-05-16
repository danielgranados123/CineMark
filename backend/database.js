// Importo librerias
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import { config } from "./src/config.js"

// Base de datos
mongoose.connect(config.db.URI);

const connection =  mongoose.connection;

// Confirmacion
connection.once("open", () => {
    console.log("DB is connected");
});

connection.on("disconnected", () => {
    console.log("DB is disconnected");
});

connection.once("error", () => {
    console.log("error found" + error);
});