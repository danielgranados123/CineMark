/*
    Campos:
        name
        email
        password
        phone
        address
        dui
*/

import { Schema, model } from "mongoose";

const customerSchema =  new Schema({
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
    dui: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Customers", customerSchema);