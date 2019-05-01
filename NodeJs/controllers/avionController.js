var express = require('express');
var body = require ('body-parser');
var app=express();
var mdAutenticacion = require ('../middlewares/autenticacion.js');


var Avion = require('../models/avion.js');


//Obtener aviones
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Avion.find({},)
        // .skip(desde)
        // .limit(5)
        // .populate('pasajeros')
        .populate('ruta')
        .exec(
            (err, aviones) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando aviones',
                        errors: err
                    });
                }
                // Para probar en POSTMAN   
                // Avion.count({},(err,conteo)=>{
                //     res.status(200).json({
                //         ok: true,
                //         total: conteo ,
                //         aviones: aviones
                //     });

                // });
                res.send(aviones);
            });
});

//Actualizar alguna ruta del aerolinea
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Avion.findById(id, (err, avion) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar avion',
                errors: err
            });
        }

        if (!avion) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La avion con la id ' + id + ' no existe',
                errors: { messahe: 'No existe una avion con ese id' }
            });
        }

        avion.numero = body.numero;
        avion.piloto = body.piloto;
        avion.role = body.role;
        avion.pasajeros = body.pasajeros;
        avion.ruta = body.ruta;

        avion.save((err, aerolineaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar avion',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                avion: aerolineaGuardado
            });
        });
    });

});



//Registar los aviones del aerolinea
app.post('/', (req, res) => {
    var body = req.body;
    var avion = new Avion({
        numero: body.numero,
        piloto: body.piloto,
        role: body.role,
        pasajeros:body.pasajeros,
        ruta: body.ruta
    });

    avion.save((err, aerolineaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error creando avion',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            avion: aerolineaGuardado
        });
    });
});


//Eliminar algun avion del aerolinea
app.delete('/:id', (req,res)=>{
    var id = req.params.id;

    Avion.findByIdAndRemove(id, (err, avionBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar avion',
                errors: err
            });
        }
        
        if (!avionBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no existe esa avion',
                errors: { message: ' No existe avion con esa id'}
            });
        }
        res.status(200).json({
            ok: true,
            avion: avionBorrado
        });
    })
});

module.exports = app;