const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { Owner } = require('./db');


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
var conectados = [];
io.on('connection', (socket) => {

  //Se conecta el usuario
  socket.on('conectado', (algo, email) => { //cada vez que alguien se conecte, se ejecutara la funcion
    //agregamos a la variable conectados {email:emaildelusuario@algo.com, id:928429848374(ejemplo)}
    conectados.push({email, id:socket.id})
    // sos Owner ?Provider.findAll(user => user.storageMessage.email === mailOwner)
    console.log(conectados)
    console.log(algo) //cambiar por 'Usuario conectado'
  })

  //Quiero enviar un mensaje
  socket.on('mensaje enviado', (mensaje, providerEmail, email) => {
    //Che, el usuario con el cuál estas intentando hablar esta conectado ??
        if(conectados.find(x=>x.email === providerEmail)){
          console.log("Soy el mensaje del usuario: ",mensaje)
          io.emit('Mensaje agregado a Mensajes', mensaje)
        } 
        //NOOO :(
        else{
          const unreadMessage = {
            message: [mensaje],
            providerEmail
          }
          Owner.findOne({
            where:{
              email:email,
            }
          }).then(x=>{
            const hasProviderEmail = x.pendingMessages.find(x=>x.providerEmail === providerEmail);
            if(hasProviderEmail){
              hasProviderEmail.message.push(unreadMessage.message[0])

              var newpendingMessages = x.pendingMessages.filter(x=>x.providerEmail !== providerEmail);
              console.log(hasProviderEmail)
              newpendingMessages.push(hasProviderEmail)
              console.log(newpendingMessages)
              x.update({...x, pendingMessages:newpendingMessages})
            }
            else{
            x.update({...x, pendingMessages:[...x.pendingMessages, unreadMessage]})
          }
          })
          console.log('noi nada che')
        }
  })
  socket.on('disconnect', () => {
    conectados = conectados.filter(x=> x.id !== socket.id)
    console.log(conectados)
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
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = {server, app};