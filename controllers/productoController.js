'use strict'
var Producto = require('../models/producto.js')
const excelToJson = require('convert-excel-to-json');

//Creamos un método en el controlador
function guardar(req,res) {
    let producto = new Producto()
    producto.nombre = req.body.nombre
    producto.descripcion = req.body.descripcion
    producto.precio = req.body.precio
    producto.stock = req.body.stock

    producto.save((err,productostore) => {
        if (err) res.status(500).send(`Error> ${err}`)
        res.status(200).send({producto:productostore})
    })
}

function buscar(req,res){
    Producto.find({}, (err,producto) => {
        if(!producto) return res.status(404).send({
            message:'Error producto no existe'
        }) 
        res.status(200).send({producto})
    })
}

function editar(req,res){
    let productoId = req.params.id
    let update = req.body
    Producto.findByIdAndUpdate(productoId, update,
        {new:true},(err, productoupdated) =>{
        if(err) return res.status(500).send({
            message: 'Error en el servidor'
        });
         
        if(productoupdated){
            return res.status(200).send({
                producto:productoupdated
            });
        }else{
            return res.status(404).send({
                message: 'No existe el producto'
            });
        }
    });
}

function borrar(req,res){
    let productoId = req.params.id
    Producto.findByIdAndRemove(productoId, (err, productoRemoved) => {
        if(err) return res.status(500).send({ 
            message: 'Error en el servidor' 
        });
        if(productoRemoved){
            return res.status(200).send({
                producto: productoRemoved
            });
        }else{
            return res.status(404).send({
                message: 'No existe el producto'
            });
        }  
   });
}

/*-----------SUBIDA DE EXCEL -> JSON -> MONGO---------------*/
const uploadFile = require("../middlewares/upload");

const uploadFileProductos = async (req, res) => {
    try{
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ 
                message: "Por favor, suba un archivo!" 
            });
        }
        //segun la ruta, ejecutar funcion importExcelData2MongoDB
        importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename);
        res.status(200).send({
            message: "¡EXITO!, Archivo subido: " + 
            req.file.originalname,
        });
    } catch (err) {
        res.status(500).send({
            message: `No puedes subir el archivo: 
            ${req.file.originalname}. ${err}`,
        });
    }
}



// -> Importar archivo de Excel a la base de datos
function importExcelData2MongoDB(filePath){
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            name: 'producto',
            header:{
               rows: 1
            },
			
            // Columnas a claves
            columnToKey: {
                A: 'nombre',
                B: 'descripcion',
                C: 'precio',
                D: 'stock',
            }
        }]
    });
 
    //Ver json en consola + mensaje de exito
    console.log(excelData);
    console.log("CONVERSION A JSON EXITOSA");

    //------- INSERTAR DATOS JSON A MONGO-------
    Producto.collection.insertMany(excelData.producto, function (err, docs) {
        if (err){ 
            return console.error(err);
        } else {
          console.log("Datos insertados en Mongo!!");
        }
    });
}

// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    guardar,
    buscar,
    editar,
    borrar,
    uploadFileProductos
};