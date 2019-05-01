const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ACTIVE_ROLE', 'INACTIVE_ROLE'],
    message: '{VALUE} no es un rol permitido'
}


var avionSchema = new Schema({
    numero : {type : String,unique:true, required: [true, 'EL numero es necesario']},
    piloto : {type : String,required: [true, 'EL nombre del piloto es necesario']},
    role : {type : String, required: true, default: 'ACTIVE_ROLE', enum: rolesValidos},
    pasajeros : [{type : Schema.Types.ObjectId, ref: 'Pasajero', required: false}],
    ruta : {type : Schema.Types.ObjectId,ref: 'Ruta', required: false}
});

avionSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Avion',avionSchema);