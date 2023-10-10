const express = require('express')
const router = express.Router()
const {getMovies, setMovie, deleteMovie, likeMovie} = require('../controllers/moviesControllers')
const {adminProtect, protect} = require('../middleware/authMiddleware')


router.get('/', getMovies)
router.post('/', adminProtect ,setMovie)
router.delete('/:id', adminProtect ,deleteMovie)
router.put('/:id', protect ,likeMovie)

module.exports = router