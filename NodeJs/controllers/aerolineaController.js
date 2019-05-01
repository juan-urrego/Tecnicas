var express = require('express');
var body = require ('body-parser');
var app=express();
var bcrypt = require('bcryptjs');
var mdAutenticacion = require ('../middlewares/autenticacion.js');

var Aerolinea = require('../models/aerolinea.js');


//Obtener aerolineas
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Aerolinea.find({},)
        .skip(desde)
        .limit(5)
        // .populate('rutas')
        // .populate('aviones')
        .exec(
            (err, aerolineas) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error cargando aerolineas',
                        errors: err
                    });
                }
                //Para probar postman
                // Aerolinea.count({},(err,conteo)=>{
                //     res.status(200).json({
                //         ok: true,
                //         total: conteo ,
                //         aerolineas: aerolineas
                //     });

                // });
                res.send(aerolineas);
            });
});

//Actualizar alguna ruta del aeropuerto
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Aerolinea.findById(id, (err, aerolinea) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar aerolinea',
                errors: err
            });
        }

        if (!aerolinea) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La aerolinea con la id ' + id + ' no existe',
                errors: { messahe: 'No existe una aerolinea con ese id' }
            });
        }

        aerolinea.nombre = body.nombre;
        aerolinea.id = body.id;
       
        

        aerolinea.save((err, aerolineaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar aerolinea',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                aerolinea: aerolineaGuardado
            });
        });
    });

});



//Registar las rutas del aeropuerto
app.post('/', (req, res) => {
    var body = req.body;
    var aerolinea = new Aerolinea({
        nombre: body.nombre,
        id: body.id,
        password: bcrypt.hashSync(body.password),
        role: body.role,
        rutas:body.rutas,
        aviones: body.aviones
    });

    aerolinea.save((err, aerolineaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error creando aerolinea',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            aerolinea: aerolineaGuardado
        });
    });
});


//Eliminar alguna ruta del aeropuerto
app.delete('/:id', (req,res)=>{
    var id = req.params.id;

    Aerolinea.findByIdAndRemove(id, (err, aerolineaBorrado)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al borrar aerolinea',
                errors: err
            });
        }
        
        if (!aerolineaBorrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no existe esa aerolinea',
                errors: { message: ' No existe aerolinea con esa id'}
            });
        }
        res.status(200).json({
            ok: true,
            aerolinea: aerolineaBorrado
        });
    })
});


module.exports = app;