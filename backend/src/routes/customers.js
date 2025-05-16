import express from "express";
import customersController from "../controllers/customersController.js";

// Metodos para employees
const router = express.Router();

router.route("/")
.get(customersController.getCustomer)

router.route("/:id")
.put(customersController.updateCustomer)
.delete(customersController.deleteCustomer)

export default router;