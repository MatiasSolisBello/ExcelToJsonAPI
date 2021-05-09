'use strict'

//Cargamos modulo express para crear nuevas rutas
var express = require('express');

//cargamos el controlador
var productoController = require('../controllers/productoController');

//llamamos al router
var api= express.Router();

//guardamos empresa
api.post('/producto',productoController.guardar)
api.get('/producto',productoController.buscar)
api.put('/producto/:id',productoController.editar)
api.delete('/producto/:id',productoController.borrar)

/*-----------SUBIDA DE EXCEL -> JSON -> MONGO---------------*/
api.post('/uploadfile', productoController.uploadFileProductos)

//exportamos configuracion
module.exports = api;