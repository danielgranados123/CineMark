/*
    Campos:
        tittle
        description
        director
        genre
        year
        duration
        image
*/

import { Schema, model } from "mongoose";

const movieSchema =  new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Movies", movieSchema);
