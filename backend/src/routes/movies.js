import express from "express";
import moviesController from "../controllers/moviesController.js";

// Metodos para movies
const router = express.Router();

router.route("/")
.get(moviesController.getMovie)
.post(moviesController.createMovie) 

router.route("/:id")
.put(moviesController.updateMovie)
.delete(moviesController.deleteMovie)

export default router;