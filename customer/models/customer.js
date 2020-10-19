const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    tipoPessoa: {
        type: String,
        required: true
    }
});

mongoose.model('customer', CustomerSchema);
module.exports = mongoose.model('customer');