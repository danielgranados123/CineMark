/*
    Campos:
        name
        email
        password
        phone
        address
        pisition
        hiring_date
        salary
        dui
        
*/

import { Schema, model } from "mongoose";

const employeeSchema =  new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    },
    hiring_date: {
        type: Date,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    dui: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Employees", employeeSchema);