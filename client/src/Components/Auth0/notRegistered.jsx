import React, { useEffect } from "react";
import Swal from "sweetalert2";

export const NotRegistered=()=>{

    useEffect(()=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    },[])
    
    return(
        <h1>Usuario no encontrado, por favor volve hasta la página anterior</h1>
    )
}


export default NotRegistered