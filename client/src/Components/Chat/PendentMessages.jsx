import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

export default function PendentMessages(){
    const {user} = useAuth0()
    const [pendingMessagesOwner, setPendingMessagesOwner] = useState([])
    const [pendingMessagesProvider, setPendingMessagesProvider] = useState([])
    useEffect(()=>{
        if(user){
            console.log(user.email)
            axios.get('https://proyecto-grupal.herokuapp.com/providers?filter=&order=ASC').then(x=>{
                let messages = x.data.filter(x=>{
                    return(x.pendingMessages.find(x=>x.ownerEmail === user.email))
                })
                console.log(messages)
                setPendingMessagesOwner(messages)
            })
            axios.get('https://proyecto-grupal.herokuapp.com/owners').then(x=>{
                let messages = x.data.filter(x=>{
                    return(x.pendingMessages.find(x=>x.providerEmail === user.email))
                })
                console.log(messages)
                setPendingMessagesProvider(messages)
            })
        }
        //     axios.get('https://proyecto-grupal.herokuapp.com/owners').then(x=>{
        //         // if( x.data.pendingMessages){
        //         // let messages = x.data.filter(x=>{x.pendingMessages.providerEmail === user.email})
        //         // setPendingMessagesProvider(...pendingMessagesProvider, messages)
        //    // }
        //    // })
        // }
    },[user])
    const navigate = useNavigate()
    return(
    <div>
    <h1>Mensajes</h1>
    {pendingMessagesOwner&&pendingMessagesOwner.length&&<div>{pendingMessagesOwner.map(x=><input type='button' onClick={()=>navigate(`/chat/${x.email}/${user.email}`)} value={x.name}/>)}</div>}
    {pendingMessagesProvider&&pendingMessagesProvider.length&&<>{pendingMessagesProvider.map(x=><input type='button' onClick={()=>navigate(`/chat/${user.email}/${x.email}`)} value={x.name}/>)}</>}
    </div>
    )
}
