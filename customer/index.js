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
mongoose.connect('mongodb://127.0.0.1:27017/link', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado"))
.catch((err) => console.error("Erro ao conectar com o MongoDB "+err))

// Models
const customer = require('./models/customer')

// Midleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GET all customer
app.get('/customer', function (req, res) {
    customer.find().then(
        (customer) => res.send(customer)
    ).catch(
        () => res.sendStatus(400)
    );
});

// GET one customer
app.get('/customer/:customerId', function (req, res) {
    const customerId = req.params.customerId;
    customer.findById(customerId)
         .then((customer) => res.send(customer))
         .catch(() => res.sendStatus(400));
});

// POST customer
app.post('/customer', function (req, res) {
    const data = req.body
    if(!data) {
        res.sendStatus(400)
    }
    new customer(data).save()
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(400))
});

// Update customer
app.put('/customer/:customerId', function (req, res) {
    const customerId = req.params.customerId;
    const data = req.body;
    if(!data || !customerId) {
        res.sendStatus(400)
    }
    
    customer.findByIdAndUpdate(customerId, data)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});

// DELETE customer
app.delete('/customer/:customerId', function (req, res) {
    const customerId = req.params.customerId;
    customer.findByIdAndRemove(customerId)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});


// Subindo Server
app.listen(8080, () => {
    console.log('Servidor rodando em http://127.0.0.1:8080/')
});