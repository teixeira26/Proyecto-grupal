import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Quesos = ()=>{
    const {user} = useAuth0();
    const navigate = useNavigate()
    const ownerRegister = async()=>{
        let owner = {
            email:user.email,
            name:user.given_name,
            lastName: user.family_name,
          }
          await axios.post('http://localhost:3001/owners', owner)
          navigate('/agregarMascota')
    }
    const providerRegister = async()=>{
        let provider = {
            email:user.email,
            name:user.given_name,
            lastName: user.family_name,
          }
          await axios.post('http://localhost:3001/providers', provider)
          navigate('/infoProvider2')
    }
    return(
        <div>
            <h1>QUE SOS ??</h1>
        <button onClick={ownerRegister}>owner</button>
        <button onClick={providerRegister}>provider</button>
        </div>

    )
}