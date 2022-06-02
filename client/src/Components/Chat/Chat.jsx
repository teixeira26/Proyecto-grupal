import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import socket from "./Socket";




export const Chat = ()=>{
    const {user} = useAuth0();
    const [mensaje, setMensaje] = useState({nombre:user.name});
    const [mensajes, setMensajes] = useState([]);
    

    useEffect(()=>{
        socket.emit('conectado', "Servidor conectado con exito")
    }, [])
    const setMessage = (e)=>{
        console.log(e.target.value)
        setMensaje({
            ...mensaje,
            mensaje:e.target.value
        })
    }

    useEffect(()=>{
        socket.on('polizonte',(obj)=>{
            console.log('para polii, esto no es yerba es la hoja')
            setMensajes([...mensajes, obj])
        } )
    },[mensajes])
    const submitMessage = (e)=>{
        e.preventDefault();
        socket.emit("mensaje enviado", mensaje)
    }
    return (
      <div>
        <form onSubmit={submitMessage}>
          <input
            type="text"
            placeholder="mensaje"
            name="message"
            onChange={setMessage}
          ></input>
          <input type="submit" value="Enviar"></input>
        </form>

        {mensajes.map((x,y)=>{
            return(
            <p key={y}>{`${x.nombre}:${x.mensaje}`}</p>
            )
        })}

      </div>
    );
}

export default Chat