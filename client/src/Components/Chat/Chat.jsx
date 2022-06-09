import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import socket from "./Socket";
import { useAuth0 } from "@auth0/auth0-react";
import NavBarShop from '../NavBar/NavBarShop';
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from './Chat.module.css';

export const Chat = () => {
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;
    const [mensaje, setMensaje] = useState({
      nombre:user.name,
      mensaje:''
    });
    const [mensajes, setMensajes] = useState([]);
    
    const almacenar = ()=>{
      let cache = [];
      return function (msj, addCache, renderMessages, cleanCache){
          if(addCache){
            console.log('Se agregaron cosas al cache')
            cache.push(msj)
            console.log("cache: ",cache)
          }
          else if(renderMessages){
            console.log('Se llenó el estado mensajes con el contenido del cache')
            setMensajes([...cache, msj]);
            console.log("cache: ",cache)
            // localStorage.setItem(`${providerEmail}`, JSON.stringify([...mensajes, cache]))
          }
          if(cleanCache){
            console.log('Se limpió el cache')
            cache = [];
            console.log("cache: ", cache)
          }
      }
    }
    
    const sendCache = almacenar();
    useEffect(() => {
        sendCache(false, false, false, true)
        socket.emit('conectado', "Chat conectado con exito", user.email, providerEmail, ownerEmail)
        const storedMessages = localStorage.getItem(`${providerEmail}`)
        // console.log(JSON.parse(storedMessages));
        if(storedMessages){
          setMensajes(JSON.parse(storedMessages))
        }
    }, [])
    
    const setMessage = (e) => {
        setMensaje({
            ...mensaje,
            mensaje:e.target.value
        })
    }
    
    useEffect(()=>{
        socket.on('Mensaje agregado a Mensajes', (msj, caso1, caso2, caso3, lastMessageReceived) => {
            if(caso1 === true){
              console.log('Se ejecutó un caso 1: ambos usuarios conectados');
              setMensajes([...mensajes, msj]);
            }
            else if(caso2){
              console.log("Se ejecutó un caso 2: usuario 1 conectado y usuario 2 desconectado")
              setMensajes([...mensajes, msj]);
            }
            else if(caso3){
              console.log("Se ejecutó un caso 3: usuario 2 conectado")
              if(lastMessageReceived){
                console.log('se recibió último mensaje')
                sendCache(msj, false, true, true)//lastMessagerReceived
              }
              else{
                console.log('se recibe un mensaje de caso 3')
                sendCache(msj, true, false, false)//addCache
              }
            }
        });
        if(mensajes.length > 30){
          mensajes.shift()
          setMensajes(mensajes)
          console.log(mensajes);
        }
        localStorage.setItem(`${providerEmail}`, JSON.stringify(mensajes))
        return () => {socket.off()}; // Esto no permite que entre en un bucle de sockets
    },[mensajes])
    const divRef = useRef(null);
    useEffect(()=>{
      divRef.current.scrollIntoView({behavior:'smooth'})
    });

    const submitMessage = (e)=>{
        e.preventDefault();
        socket.emit("mensaje enviado", mensaje, providerEmail, user.email, ownerEmail)
        setMensaje({
          ...mensaje,
          mensaje:''
        })
    }

  return (
    <div>
      <NavBarShop />
      <div className={inContainer.container}>
        <NavLink to={`/providers/${providerEmail}`}>
          <img src="/assets/img/arrow-left.svg" alt="back arrow" className={styles.leftArrow}/>
        </NavLink>
        <div className={styles.titleChat}>
          <h2>Tu conversacion</h2>
        </div>
        <div className={styles.chat}>
          {mensajes.length > 0 ? mensajes.map((x, y) => {
            return (
              <p key={y}><strong className={styles.strong}>{x.nombre}:</strong> {`${x.mensaje}`}</p>
            )
          }) : null
          }
          <div ref={divRef}></div>
        </div>
        <form className={styles.form} onSubmit={submitMessage}>
          <input type="text" value={mensaje.mensaje} placeholder="Tu mensaje" name="message" onChange={setMessage}></input>
          <button type="submit" value="Enviar">Enviar mensaje</button>
        </form>
        <NavLink to='/reservar-servicio'><button>Reservar servicio</button></NavLink>
      </div>
    </div>
  );
}

export default Chat;