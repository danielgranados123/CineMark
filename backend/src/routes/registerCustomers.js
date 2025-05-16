import express from "express";
import registerCustomersController from "../controllers/registerCustomersController.js";
const router = express.Router()

// /api/registerClients
router.route("/").post(registerCustomersController.registerCustomer)

// /api/registerClients/verifyCodeEmail
router.route("/verifyCodeEmail").post(registerCustomersController.verifyCodeEmail)

export default router