const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;



var rutaSchema = new Schema({
    ciudad : {type : String,unique:true, required: [true, 'EL nombre es necesario']},
});


module.exports = mongoose.model('Ruta',rutaSchema);