const asyncHandler = require('express-async-handler')
const Page = require('../models/moviesModel')

const getMovies = asyncHandler( async (req, res) => {
    let page = await Page.findOne()
    
    if (!page) {
        res.status(404)
        throw new Error('No se encontraron películas')
    }

    const movies = page.results
    res.status(200).json(movies)
})



module.exports = {
    getMovies
}