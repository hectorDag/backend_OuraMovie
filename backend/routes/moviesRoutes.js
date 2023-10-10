const express = require('express')
const router = express.Router()
const {getMovies, setMovie, deleteMovie, likeMovie} = require('../controllers/moviesControllers')

router.get('/', getMovies)
router.post('/', setMovie)
router.delete('/:id', deleteMovie)
router.put('/:id', likeMovie)

module.exports = router