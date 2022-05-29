import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


export const Loading =()=>{
    const {isAuthenticated, isLoading} = useAuth0()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isAuthenticated&&!isLoading)navigate('/notRegistered')
    },[isLoading])
    return(
        <img src="https://tradinglatam.com/wp-content/uploads/2019/04/loading-gif-png-4.gif"/>
    )
}

export default Loading;