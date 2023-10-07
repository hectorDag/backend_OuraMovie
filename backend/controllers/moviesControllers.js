const asyncHandler = require('express-async-handler')
const Movie = require('../models/moviesModel')

const getMovies = asyncHandler( async (req, res) => {
    const movies = await Movie.find()
    res.status(200).json(movies)
})

const setMovie = asyncHandler( async (req, res) => {

    const {adult,genre_ids ,id ,original_language, 
    original_title, overview, release_date, title, 
    vote_average} = req.body

    const movie = await Movie.create({
    adult,genre_ids ,id ,original_language, 
    original_title, overview, release_date, 
    title, vote_average})

    if(movie) {
        res.status(201).json({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            vote_average: vote_average
        })
    }else {
        res.status(400)
        throw new Error ('No se pudo crear el ususario')
    }
})

module.exports = {
    getMovies,
    setMovie
}