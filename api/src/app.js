const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');
const http = require('http');
const server = express();

const app = http.createServer(server)
const socketio = require('socket.io')
const io = socketio(app, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})

io.on('connection', (socket) => {
  socket.on('conectado', (algo) => { //cada vez que alguien se conecte, se ejecutara la funcion
    console.log(algo) //cambiar por 'Usuario conectado'
  })
  socket.on('mensaje enviado', (mensaje) => {
    console.log("Soy el mensaje del usuario: ",mensaje)
    io.emit('Mensaje agregado a Mensajes', mensaje)
  })
});

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000' ); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = {server, app};