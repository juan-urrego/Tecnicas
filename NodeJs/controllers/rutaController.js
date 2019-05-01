var express = require('express');
var body = require ('body-parser');
var app=express();
var mdAutenticacion = require ('../middlewares/autenticacion.js');


var Ruta = require('../models/ruta.js');


//Obtener rutas
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Ruta.find({},)
        .skip(desde)
        .limit(5)
        .exec(
            (err, rutas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando ruta',
                        errors: err
                    });
                }
                // Ruta.count({},(err,conteo)=>{
                //     res.status(200).json({
                //         ok: true,
                //         total: conteo ,
                //         rutas: rutas
                //     });

                // });
                res.send(rutas);
            });
});


//obtener una sola ruta
// app.get('/:id', (req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No record with given id :${req.params.id}');
//     Ruta.findById(req.params.id,(err,doc)=>{
//         if(!err){res.send(doc); }
//         else {console.log('Error in Retriving Employee :' +JSON.stringify(err, undefined ,2)); }
//     }); 
// });

app.get('/:id', (req, res) => {
    var id = req.params.id;



    Ruta.findById(id,)
        .exec(
            (err, rutas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando ruta',
                        errors: err
                    });
                }
               
                // res.status(200).json({
                //     ok: true,
                //     // total: conteo ,
                //     rutas: rutas
                // });

                
                res.send(rutas);
            });
});



//Actualizar alguna ruta del aeropuerto
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Ruta.findById(id, (err, ruta) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar ruta',
                errors: err
            });
        }

        if (!ruta) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La ruta con la id ' + id + ' no existe',
                errors: { messahe: 'No existe una ruta con ese id' }
            });
        }

        ruta.ciudad = body.ciudad;
       
        

        ruta.save((err, rutaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar ruta',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                ruta: rutaGuardado
            });
        });
    });

});




//Registar las rutas del aeropuerto
app.post('/', (req, res) => {
    var body = req.body;
    var ruta = new Ruta({
        ciudad: body.ciudad
    });

    ruta.save((err, rutaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error creando ruta',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            ruta: rutaGuardado
        });
    });
});


//Eliminar alguna ruta del aeropuerto
app.delete('/:id', (req,res)=>{
    var id = req.params.id;

    Ruta.findByIdAndRemove(id, (err, rutaBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar ruta',
                errors: err
            });
        }
        
        if (!rutaBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no existe esa ruta',
                errors: { message: ' No existe ruta con esa id'}
            });
        }
        res.status(200).json({
            ok: true,
            ruta: rutaBorrado
        });
    })
});


module.exports = app;