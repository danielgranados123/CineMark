// Importo
import employeeModel from "../models/Employees.js"; //Modelo
import bcryptjs from "bcryptjs"; //Encriptar
import jsonwebtoken from "jsonwebtoken"; //Token
import { config } from "../config.js";

// creamos un array de funciones
const registerEmployeesController = {};

registerEmployeesController.register = async(req, res)=> {
    const {
        name,
        email,
        password,
        phone,
        address,
        position,
        hiring_date,
        salary,
        dui
    } = req.body;

    try {
        // Verifico si existe
        const existEmployee = await employeeModel.findOne({email})
        if(existEmployee) {
            return res.json({message: "Employee already exist"})
        } 

        // Encripto contra
        const passwordHash = await bcryptjs.hash(password, 10)

        // Guardo
        const newEmployee = new employeeModel({name, 
            name,
            email,
            password: passwordHash,
            phone,
            address,
            position,
            hiring_date,
            salary,
            dui
        })

        await newEmployee.save();

        //TOKEN
        jsonwebtoken.sign(
            //Que voy a guardar
            {id: newEmployee._id},
            //Secreto
            config.JWT.secret,
            //Expiracion
            {expiresIn: config.JWT.expiresIn},
            //Funcion flecha
            (error, token) =>{
                if(error) console.log("error"+error)
                res.cookie("authToken", token)
                res.json({message: "Employee saved"})
            }
        )

    } catch (error) {
        console.log("error"+error)
        res.json({message: "Error saving employee"})
    }
} 

export default registerEmployeesController;