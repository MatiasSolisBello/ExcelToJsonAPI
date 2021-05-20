'use strict'

//Cargamos modulo express para crear nuevas rutas
var express = require('express');

//cargamos el controlador
var productoController = require('../controllers/productoController');

//llamamos al router
var api= express.Router();

//guardamos empresa
api.post('/productos',productoController.guardar)
api.get('/productos',productoController.buscar)
api.get('/productos/:_id',productoController.buscarPorId)
api.put('/productos/:id',productoController.editar)
api.delete('/productos/:id',productoController.borrar)

/*-----------SUBIDA DE EXCEL -> JSON -> MONGO---------------*/
api.post('/uploadfile', productoController.uploadFileProductos)

//exportamos configuracion
module.exports = api;