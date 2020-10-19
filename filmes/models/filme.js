const mongoose = require('mongoose');
const FilmeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    photo: {
        type: String
    }
});

mongoose.model('filmes', FilmeSchema);
module.exports = mongoose.model('filmes');