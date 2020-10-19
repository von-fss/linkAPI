// Config
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors(corsOptions));

// Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/app-filmes', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar com o MongoDB "+err))


// Models
const Filme = require('./models/filme')

// Midleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// POST filme
app.post('/filmes', function (req, res) {
    const data = req.body
    if(!data) {
        res.sendStatus(400)
    }
    new Filme(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
});

// GET all filmes
app.get('/filmes', function (req, res) {
    Filme.find()
         .then((filmes) => res.send(filmes))
         .catch(() => res.sendStatus(400));
});

// GET one filme
app.get('/filmes/:filmeId', function (req, res) {
    const filmeId = req.params.filmeId;
    Filme.findById(filmeId)
         .then((filme) => res.send(filme))
         .catch(() => res.sendStatus(400));
});

// PUT filmes
app.put('/filmes/:filmeId', function (req, res) {
    const filmeId = req.params.filmeId;
    const data = req.body;
    if(!data || !filmeId) {
        res.sendStatus(400)
    }
    
    Filme.findByIdAndUpdate(filmeId, data)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});

// DELETE filmes
app.delete('/filmes/:filmeId', function (req, res) {
    const filmeId = req.params.filmeId;
    Filme.findByIdAndRemove(filmeId)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});

// Subindo Server
app.listen(8080, () => {
    console.log('Servidor rodando em http://127.0.0.1:8080/')
});