// Array de métodos (CRUD)
const customersController = {};
import customersModel from "../models/Customers.js"

// SELECT
customersController.getCustomer = async (req, res) => {
    const customers = await customersModel.find()
    res.json(customers)
};

// DELETE
customersController.deleteCustomer = async (req, res) => {
    await customersModel.findOneAndDelete(req.params.id)
    res.json({ message: "Customer deleted"})
};

// UPDATE
customersController.updateCustomer = async (req, res) => {
    const { name, email, password, phone, address, dui } = req.body;
    
    await customersModel.findByIdAndUpdate(req.params.id, {
        name, 
        email, 
        password, 
        phone, 
        address,
        dui
    }, {new: true}
    );

    res.json({ message: "Customer updated"})
};

export default customersController;