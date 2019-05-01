const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var pasajeroSchema = new Schema({
    nombre : {type : String, required: [true, 'EL nombre es necesario']},
    apellido : {type : String, required: [true, 'EL apellido es necesario']},
    identificacion : {type : String, unique:true, required: [true, 'la identificacion es necesaria']},
    edad : {type : Number, required: [true, 'la edad es necesaria']},
    telefono : {type : Number, required: [true, 'el telefono es necesario']},
    carga : {type : Number, required: [true, 'la carga es necesaria']},
});



module.exports = mongoose.model('Pasajero',pasajeroSchema);