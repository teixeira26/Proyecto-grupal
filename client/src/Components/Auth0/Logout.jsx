import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './Logout.module.css'

export const Logout = ()=>{
    const {logout}= useAuth0();

    return (
    <button onClick={()=>logout({returnTo: window.location.origin})} className={styles.button}>Cerrar Sesión</button>
    )
}

export default Logout