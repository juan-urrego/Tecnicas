const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'AERO_ROLE'],
    message: '{VALUE} no es un rol permitido'
}


var aerolineaSchema = new Schema({
    nombre : {type : String,unique:true, required: [true, 'EL nombre es necesario']},
    id : {type : String,unique:true, required: [false, 'EL NIT de la aerolinea es necesario']},
    password : {type : String, required: [true, 'LA constraseña es necesario']},
    role : {type : String, required: true, default: 'AERO_ROLE', enum: rolesValidos},
    rutas :
        [{
        type : Schema.Types.ObjectId,
        ref: 'Ruta',
        required: false
    }],
    aviones : [{
        type : Schema.Types.ObjectId,
        ref: 'Avion',
        required: false
    }]
});

aerolineaSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Aerolinea',aerolineaSchema);