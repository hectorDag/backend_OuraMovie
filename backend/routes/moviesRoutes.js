const express = require('express')
const router = express.Router()
const {getMovies, setMovie, deleteMovie} = require('../controllers/moviesControllers')

router.get('/', getMovies)
router.post('/', setMovie)

module.exports = router