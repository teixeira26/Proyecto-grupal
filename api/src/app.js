const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { Owner, Provider} = require('./db');


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
  socket.on('conectado', (algo, email, providerEmail, ownerEmail) => { //cada vez que alguien se conecte, se ejecutara la funcion
    //agregamos a la variable conectados {email:emaildelusuario@algo.com, id:928429848374(ejemplo)}
    conectados.push({email, id:socket.id})
    // sos Owner ?Provider.findAll(user => user.storageMessage.email === mailOwner)
    if(email === providerEmail){

      Owner.findAll().then(owners=>{
        owners.forEach((x)=>{
          // por cada registro de owner, quiero verificar si existe algún mensaje para mí



          //-------------------------- verificación owner----------------------
          //pending messages tiene el valor de [], por lo tanto si su length es > 0, esto significa 
          //que este owner tiene por lo menos un mensaje pendiente a alguien
          if(x.dataValues.pendingMessages.length>0){
            //  console.log(x.dataValues.pendingMessages[0].message)
            //verifico si este usuario tiene algún mensaje pendiente para mí
              let myMessages = x.dataValues.pendingMessages.find(x=>{
                return x.providerEmail === email
              })
              const arrwithoutmyMessages = x.dataValues.pendingMessages.filter(x=>x!==myMessages)//{messages:[{nombre:idwhiher, mensaje:idjsijd}], provider.email}
              console.log(myMessages.message);
              //Si hay un mensaje pendiente para mí
              if(myMessages){
                console.log("Se ejecutó un caso 3: usuario 2 conectado")
                for(let x=0;x<=myMessages.message.length-1;x++){
                  if(x === myMessages.message.length-1){
                    io.emit('Mensaje agregado a Mensajes', myMessages.message[x], false, false, true, true)
                    Owner.update({...x, pendingMessages:arrwithoutmyMessages}, {where:{email:ownerEmail}}).then(()=>console.log("se vacio la base de datos")).catch((e)=>console.log(e))
                  }
                  else{
                    io.emit('Mensaje agregado a Mensajes', myMessages.message[x], false, false, true, false)
                  }
                }
                
            }
          }})
        //si no hay mensajes pendientes no se ejecuta nada
        
      }).catch(error=>console.log(error))

    }
    else if(email === ownerEmail){
      Provider.findAll().then(providers=>{
        providers.forEach((x)=>{
          // por cada registro de owner, quiero verificar si existe algún mensaje para mí



          //-------------------------- verificación owner----------------------
          //pending messages tiene el valor de [], por lo tanto si su length es > 0, esto significa 
          //que este owner tiene por lo menos un mensaje pendiente a alguien
          if(x.dataValues.pendingMessages.length>0){
            //  console.log(x.dataValues.pendingMessages[0].message)
            //verifico si este usuario tiene algún mensaje pendiente para mí
              let myMessages = x.dataValues.pendingMessages.find(x=>{
                return x.ownerEmail === email
              })
              const arrwithoutmyMessages = x.dataValues.pendingMessages.filter(x=>x!==myMessages)//{messages:[{nombre:idwhiher, mensaje:idjsijd}], provider.email}
              console.log(myMessages.message);
              //Si hay un mensaje pendiente para mí
              if(myMessages){
                console.log("Se ejecutó un caso 3: usuario 2 conectado")
                for(let x=0;x<=myMessages.message.length-1;x++){
                  if(x === myMessages.message.length-1){
                    io.emit('Mensaje agregado a Mensajes', myMessages.message[x], false, false, true, true)
                    Provider.update({...x, pendingMessages:arrwithoutmyMessages}, {where:{email:providerEmail}}).then(()=>console.log("se vacio la base de datos")).catch((e)=>console.log(e))
                  }
                  else{
                    io.emit('Mensaje agregado a Mensajes', myMessages.message[x], false, false, true, false)
                  }
                }
                
            }
          }})
        //si no hay mensajes pendientes no se ejecuta nada
        
      }).catch(error=>console.log(error))

    }
    console.log(conectados)
    console.log(algo) //cambiar por 'Usuario conectado'
  })

  //Quiero enviar un mensaje
  socket.on('mensaje enviado', (mensaje, providerEmail, email, ownerEmail) => {
    //Che, el usuario con el cuál estas intentando hablar esta conectado ??
    if(email === ownerEmail){
      if(conectados.find(x=>x.email === providerEmail)){
        console.log("Se ejecutó un caso 1: ambos usuarios conectados")
        io.emit('Mensaje agregado a Mensajes', mensaje, true, false, false, false)
      } 
      //NOOO :(
      else{
        //usuario no encontrado
        console.log("Se ejecutó un caso 2: usuario 1 conectado, usuario 2 desconectado")
        io.emit('Mensaje agregado a Mensajes', mensaje, false, true, false, false);
        //almaceno en este objeto el mensaje y el mail de la persona con la cual queria hablar
        const unreadMessage = {
          message: [mensaje],//[{nombre:fulano, mensaje:'jsdijdsi'}]
          providerEmail
        }
        //Busco en la base de datos por el registro que almacena mis infos
        Owner.findOne({
          where:{
            email:email,
          }
        }).then(x=>{
          //entonces, con este registro...
          var hasProviderEmail = x.pendingMessages.find(x=>x.providerEmail === providerEmail);
          //verifico si existe algun mensaje pendiente al mismo usuario
          if(hasProviderEmail){
            console.log('ya habias enviado ningún mensaje a esta persona, agregaremos una más a la db')
            // console.log("hasprovideremail", hasProviderEmail)
            //agarro el registro de los anteriores y agrego el nuevo mensaje que recién creé
            hasProviderEmail = {
              ...hasProviderEmail,
              message: [...hasProviderEmail.message, unreadMessage.message[0]]
            }
            console.log("array inicial", x.pendingMessages)
            //agarro el array con todos los registros de mensaje y le vuelvo a agregar con mis alteraciones
            var newpendingMessages = x.pendingMessages.filter(x=>x.providerEmail !== providerEmail);
            // console.log("antiguo array", newpendingMessages)
            newpendingMessages.push(hasProviderEmail)
            console.log("base de datos actual: ", newpendingMessages)
            //actualizo la base de datos con este nuevo array alterado
            x.update({...x, pendingMessages:newpendingMessages})
          }
          //En el caso de que no actualizo la base de datos con lo agregado
          else{
            console.log('no habias enviado ningún mensaje a esta persona, así que agregamos una ahora')
          x.update({...x, pendingMessages:[...x.pendingMessages, unreadMessage]})
        }
        })
  
      }
    }
    else if(email === providerEmail){
      if(conectados.find(x=>x.email === ownerEmail)){
        console.log("Se ejecutó un caso 1: ambos usuarios conectados")
        io.emit('Mensaje agregado a Mensajes', mensaje, true, false, false, false)
      } 
      //NOOO :(
      else{
        //usuario no encontrado
        console.log("Se ejecutó un caso 2: usuario 1 conectado, usuario 2 desconectado")
        io.emit('Mensaje agregado a Mensajes', mensaje, false, true, false, false);
        //almaceno en este objeto el mensaje y el mail de la persona con la cual queria hablar
        const unreadMessage = {
          message: [mensaje],//[{nombre:fulano, mensaje:'jsdijdsi'}]
          ownerEmail
        }
        //Busco en la base de datos por el registro que almacena mis infos
        Provider.findOne({
          where:{
            email:email,
          }
        }).then(x=>{
          //entonces, con este registro...
          var hasOwnerEmail = x.pendingMessages.find(x=>x.ownerEmail === ownerEmail);
          //verifico si existe algun mensaje pendiente al mismo usuario
          if(hasOwnerEmail){
            console.log('ya habias enviado ningún mensaje a esta persona, agregaremos una más a la db')
            // console.log("hasprovideremail", hasProviderEmail)
            //agarro el registro de los anteriores y agrego el nuevo mensaje que recién creé
            hasOwnerEmail = {
              ...hasOwnerEmail,
              message: [...hasOwnerEmail.message, unreadMessage.message[0]]
            }
            console.log("array inicial", x.pendingMessages)
            //agarro el array con todos los registros de mensaje y le vuelvo a agregar con mis alteraciones
            var newpendingMessages = x.pendingMessages.filter(x=>x.ownerEmail !== ownerEmail);
            // console.log("antiguo array", newpendingMessages)
            newpendingMessages.push(hasOwnerEmail)
            console.log("base de datos actual: ", newpendingMessages)
            //actualizo la base de datos con este nuevo array alterado
            x.update({...x, pendingMessages:newpendingMessages})
          }
          //En el caso de que no actualizo la base de datos con lo agregado
          else{
            console.log('no habias enviado ningún mensaje a esta persona, así que agregamos una ahora')
          x.update({...x, pendingMessages:[...x.pendingMessages, unreadMessage]})
        }
        })
  
      }
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