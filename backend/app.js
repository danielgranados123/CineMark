// Importo librerias
import express from "express";
import cookieParser from "cookie-parser";

// Importo rutas
import moviesRoutes from "./src/routes/movies.js"
import employeesRoutes from "./src/routes/employees.js"
import customersRoutes from "./src/routes/customers.js"


// Libreria de Express
const app = express();

// Que acepte datos de json
app.use(express.json());

// Guardar cookies
app.use(cookieParser());

// Mis rutas
app.use("/api/movies", moviesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/customers", customersRoutes)

// Exportar
export default app;