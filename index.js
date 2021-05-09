'use strict'
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

//cors
const cors = require('cors')
app.use(cors())

//directorio global
global.__basedir = __dirname;

let url = 'mongodb+srv://admin:admin@contabledemo.gowqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var producto_routes = require('./routes/productoRoute');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api', producto_routes);


// CONEXION A BASE DE DATOS
mongoose.connect(url, (err,res) =>{    
    app.listen(5000, ()=>{
        console.log("Esta corriendo en puerto 5000")
    })
})
