import express from "express";
import employeesController from "../controllers/employeesController.js";

// Metodos para employees
const router = express.Router();

router.route("/")
.get(employeesController.getEmployee)

router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee)

export default router;