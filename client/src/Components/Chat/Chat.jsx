import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "./Socket";

export const Chat = () => {
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail
    const [mensaje, setMensaje] = useState({
      nombre:user.name,
      mensaje:''
    });
    const [mensajes, setMensajes] = useState([]);
    
    useEffect(() => {
        socket.emit('conectado', "Chat conectado con exito")
        const storedMessages = localStorage.getItem(`${providerEmail}`)
        console.log(JSON.parse(storedMessages));
        if(storedMessages){
          setMensajes(JSON.parse(storedMessages))
        }
        
        console.log(mensajes)
    }, [])
    
    const setMessage = (e) => {
        setMensaje({
            ...mensaje,
            mensaje:e.target.value
        })
    }

    useEffect(()=>{
        socket.on('Mensaje agregado a Mensajes', (msj) => {
            console.log('Mensaje enviado');
            setMensajes([...mensajes, msj]);
            const storedMessage = localStorage.getItem(`providerEmail`);
            localStorage.setItem(`${providerEmail}`, JSON.stringify([...mensajes, msj]));
        })
        return () => {socket.off()}; // Esto no permite que entre en un bucle de sockets
    },[mensajes])
    
    const submitMessage = (e)=>{
        e.preventDefault();
        socket.emit("mensaje enviado", mensaje)
    }

  return (
    <div>
      <div>
        {mensajes.length>0?mensajes.map((x, y) => {
          return (
            <p key={y}>{`${x.nombre}:${x.mensaje}`}</p>
          )
        }):null
        }
      </div>
      <form onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="mensaje"
          name="message"
          onChange={setMessage}
        ></input>
        <input type="submit" value="Enviar"></input>
      </form>
    </div>
  );
}

export default Chat;