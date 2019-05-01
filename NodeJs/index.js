const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Conexion bd
const { mongoose } = require('./db.js');


//Importar Rutas
var employeeController = require('./controllers/employeeController.js');
var avionController = require('./controllers/avionController.js');
var rutaController = require('./controllers/rutaController.js');
var aerolineaController = require('./controllers/aerolineaController.js');
var pasajerpController = require('./controllers/pasajeroController.js');
var loginController = require('./controllers/loginController.js');




//Definir variables
var app= express();

//body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(cors( {origin: 'http://localhost:4200'}));


//Rutas
app.use('/employees', employeeController);
app.use('/aviones', avionController);
app.use('/rutas', rutaController);
app.use('/aerolineas', aerolineaController);
app.use('/pasajeros', pasajerpController);
app.use('/login', loginController);








//Escuchar peticiones
app.listen(3000 ,() => console.log('Server started at port : 3000'));



