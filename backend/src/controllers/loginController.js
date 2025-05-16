// Importo
import customersModel from "../models/Customers.js"
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs";
import JsonWebToken from "jsonwebtoken";
import { config } from "../config.js"

// Array de funciones
const loginController = {};

loginController.login = async(req, res)=> {
    const {email, password} = req.body;

    try {
        let userFound;
        let userType;

        // Admin
        if(email === config.ADMIN.emailAdmin && password === config.ADMIN.passwordAdmin) {
            userType = "admin";
            userFound = {_id: "admin"};
        }else{
            // Employee
            userFound = await employeesModel.findOne({email})
            userType = "employee"
            if(!userFound){
                // Customer
                userFound = await customersModel.findOne({email})
                userType = "client"
            }
        }

        if(!userFound){
            return res.json({message: "User not found"})
        }

        // Validar contraseña
        if(userType !== "admin"){
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Invalid password"})
            }
        }

        // TOKEN
        JsonWebToken.sign(
            {id: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token)=> {
                if(error) console.log("error" + error)
                res.cookie("authToken", token)
                res.json({message: "Login succesful"})
            }
        )
    } catch (error) {
        console.log("error" + error)
    }
}

export default loginController;