// Importo librerias
import express from "express";
import cookieParser from "cookie-parser";

// Importo rutas
import moviesRoutes from "./src/routes/movies.js"
import employeesRoutes from "./src/routes/employees.js"
import customersRoutes from "./src/routes/customers.js"

import registerCustomersRoutes from "./src/routes/registerCustomers.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"

import logoutRoutes from "./src/routes/logout.js"
import loginRoutes from "./src/routes/login.js"

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

app.use("/api/registerCustomers", registerCustomersRoutes)
app.use("/api/registerEmployees", registerEmployeesRoutes)

app.use("/api/logout", logoutRoutes)
app.use("/api/login", loginRoutes)


// Exportar
export default app;