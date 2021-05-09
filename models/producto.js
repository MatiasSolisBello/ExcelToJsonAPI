'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario'] },
    descripcion: {type: String, required: [true, 'La descripcion es necesario'] },
    precio: {type: Number, required: [true, 'El precio es necesario'] },
    stock: {type: Number, required: [true, 'El stock es necesario'] },
})

module.exports = mongoose.model('producto',ProductoSchema);