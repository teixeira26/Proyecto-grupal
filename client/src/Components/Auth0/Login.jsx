import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from './Login.module.css'
import { useSelector } from "react-redux";

export const Login = ()=>{
    const {user, loginWithRedirect}= useAuth0();
    console.log('USEEER LOGIN', user)
    const allUsers = useSelector(state => state.owners)
    return (
    <button onClick={loginWithRedirect} className={styles.button}>Ingresar</button>
    )
}

export default Login;