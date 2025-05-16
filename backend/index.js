// Importo archivos
import app from './app.js';
import "./database.js";

// Importo dotenv
import dotenv from "dotenv";

dotenv.config();

import {config} from "./src/config.js"

// Funcion para ejecutar el servidor
async function main(){
    app.listen(config.server.port);
    console.log("Server on port " + config.server.port);
}

// Ejecuto todo
main();