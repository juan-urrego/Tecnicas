var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var body = require('body-parser');
var SEED = require('../config/config.js').SEED;
var app = express();
var Aerolinea = require('../models/aerolinea.js');


//Autenticacion normal
app.post('/', (req,res)=>{

    var body = req.body;


    Aerolinea.findOne({nombre: body.nombre}, (err, aerolineaDB)=>{

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar aerolineas',
                errors: err
            });
        }
        
        //verifica correo
        if (!aerolineaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - nombre',
                errors: err
            });
        }
        
        //Compara contraseña
        if(!bcrypt.compareSync(body.password, aerolineaDB.password)){
        
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                errors: err
            });
        }
        
        //Creamos tokens
        aerolineaDB.password =':)';
        var token = jwt.sign({aerolinea: aerolineaDB}, SEED, {expiresIn: 14400})//4 horas



        res.status(200).json({
            ok: true,
            aerolinea: aerolineaDB,
            token: token,
            id: aerolineaDB._id
        });

    })

});





module.exports = app;