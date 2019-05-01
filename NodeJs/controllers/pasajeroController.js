var express = require('express');
var body = require ('body-parser');
var app=express();


var Pasajero = require('../models/pasajero.js');


//Obtener pasajeros
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Pasajero.find({},)
        .skip(desde)
        .limit(5)
        .exec(
            (err, pasajeros) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando pasajero',
                        errors: err
                    });
                }
                Pasajero.count({},(err,conteo)=>{
                    res.status(200).json({
                        ok: true,
                        total: conteo ,
                        pasajeros: pasajeros
                    });

                });
            });
});

//Actualizar alguna pasajero del aeropuerto
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Pasajero.findById(id, (err, pasajero) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar pasajero',
                errors: err
            });
        }

        if (!pasajero) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La pasajero con la id ' + id + ' no existe',
                errors: { messahe: 'No existe una pasajero con ese id' }
            });
        }

        pasajero.nombre = body.nombre;
        pasajero.apellido = body.apellido;
        pasajero.identificacion = body.identificacion;
        pasajero.edad = body.edad;
        pasajero.telefono = body.telefono;
        pasajero.carga = body.carga;
        pasajero.ciudad = body.ciudad;
        

        pasajero.save((err, pasajeroGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar pasajero',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                pasajero: pasajeroGuardado
            });
        });
    });

});




//Registar las pasajeros del avion
app.post('/', (req, res) => {
    var body = req.body;
    var pasajero = new Pasajero({
        nombre: body.nombre,
        apellido: body.apellido,
        identificacion: body.identificacion,
        edad: body.edad,
        telefono: body.telefono,
        carga: body.carga
    });

    pasajero.save((err, pasajeroGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error creando pasajero',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            pasajero: pasajeroGuardado
        });
    });
});


//Eliminar alguna pasajero del aeropuerto
app.delete('/:id', (req,res)=>{
    var id = req.params.id;

    Pasajero.findByIdAndRemove(id, (err, pasajeroBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar pasajero',
                errors: err
            });
        }
        
        if (!pasajeroBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no existe esa pasajero',
                errors: { message: ' No existe pasajero con esa id'}
            });
        }
        res.status(200).json({
            ok: true,
            pasajero: pasajeroBorrado
        });
    })
});


module.exports = app;