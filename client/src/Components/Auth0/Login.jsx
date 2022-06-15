import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Login = ()=>{
    const {loginWithRedirect, user}= useAuth0();
    return (
    <button onClick={()=>{loginWithRedirect()}} className="primaryButton">Ingresar</button>
    )
}

export default Login;