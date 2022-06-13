import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './Login.module.css'

export const Login = ()=>{
    const {loginWithRedirect, user}= useAuth0();
    return (
    <button onClick={()=>{loginWithRedirect()}} className={styles.button}>Ingresar</button>
    )
}

export default Login;