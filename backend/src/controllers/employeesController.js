// Array de métodos (CRUD)
const employeesController = {};
import employeesModel from "../models/Employees.js"

// SELECT
employeesController.getEmployee = async (req, res) => {
    const employees = await employeesModel.find()
    res.json(employees)
};

// DELETE
employeesController.deleteEmployee = async (req, res) => {
    await employeesModel.findOneAndDelete(req.params.id)
    res.json({ message: "Employee deleted"})
};

// UPDATE
employeesController.updateEmployee = async (req, res) => {
    const { name, email, password, phone, address, position, hiring_date, salary, dui } = req.body;
    
    await employeesModel.findByIdAndUpdate(req.params.id, {
        name, 
        email, 
        password, 
        phone, 
        address, 
        position, 
        hiring_date, 
        salary, 
        dui
    }, {new: true}
    );

    res.json({ message: "Employee updated"})
};

export default employeesController;