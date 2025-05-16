import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// CLoudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

import moviesModel from "../models/Movies.js"
const moviesController = {};

// SELECT
moviesController.getMovie = async (req, res) => {
    const movies = await moviesModel.find()
    res.json(movies)
};

// INSERT
moviesController.createMovie = async (req, res) => {
    const {title, description, director, genre, year, duration} = req.body;
    
    let imageURL = ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "svg", "jpeg"]
            }
        );
        
        imageURL = result.secure_url;
    }

    const newMovie = new moviesModel({ title, description, director, genre, year, duration, image: imageURL });
    await newMovie.save()
    res.json({ message: "Movie saved"})
};

// DELETE
moviesController.deleteMovie = async (req, res) => {
    await moviesModel.findOneAndDelete(req.params.id)
    res.json({ message: "Movie deleted"})
};

// UPDATE
moviesController.updateMovie = async (req, res) => {
    const { title, description, director, genre, year, duration } = req.body;
        
    let imageURL = ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "public",
                allowed_formats: ["png", "jpg", "svg", "jpeg"]
            }
        )
        
        imageURL = result.secure_url
    }
    
    await moviesModel.findByIdAndUpdate(req.params.id, {
        title, 
        description, 
        director, 
        genre, 
        year, 
        duration, 
        image: imageURL
    }, {new: true}
    );

    res.json({ message: "Movie updated"})
};

export default moviesController;