const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    adult: {
        type: Boolean,
        default: false
    },
    backdrop_path: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} no es una URL válida`
        }
    },
    genre_ids: {
        type: [Number],
        required: [true, 'Por favor teclea los generos que sean necesarios']
    },
    id: {
        type: Number,
        required: [true, 'Por favor teclea el id'],
        unique: true
    },
    original_language: {
        type: String,
        required: [true, 'Por favor teclea el idioma original']
    },
    original_title: {
        type: String,
        required: [true, 'Por favor teclea el titulo original']
    },
    overview: {
        type: String,
        required: [true, 'Por favor teclea el overview']
    },
    popularity: {
        type: Number,
        default: 0 
    },
    poster_path: {
        type: String,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} no es una URL válida`
        }
    },
    release_date: {
        type: String,
        required: [true, 'Por favor teclea la fecha de estreno']
    },
    title: {
        type: String,
        required: [true, 'Por favor teclea el titulo de la pelicula']
    },
    video: {
        type: Boolean,
        default: false
    },
    vote_average: { 
        type: Number,
        required: [true, 'Por favor teclea la calificacion de la pelicula']
    },
    vote_count: {
        type: Number,
        default: 0
    }
})

const pageSchema = mongoose.Schema({
    results: [movieSchema]
});

const Page = mongoose.model('Page', pageSchema)

module.exports = Page