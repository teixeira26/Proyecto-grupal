import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, getOwners } from "../../../redux/actions/ownProvActions";
import React, { useEffect, useState } from "react";
import axios from "axios";



export default function PrivateRoutes({redirectPath = "/admin",  children}){
    const { user, isAuthenticated } = useAuth0();

    const [isAdmin, setIsAdmin] = useState(false)
    const [finalizado, setFinalizado] = useState(false)



    

      const searchUser = () => {
       
        axios.get("http://localhost:3001/owners")
        .then(res =>{
            console.log('res', res)
          let resp =  res.data.find((x) => x.email === user.email)
          console.log('resp', resp)

          setIsAdmin(resp.isAdmin)
        //   console.log(resp)
         setFinalizado(true)
          

        })
          
    }

    useEffect(()=>{
      if(isAuthenticated)
       { searchUser()}
        
    }, [isAuthenticated])




    return (
        <div> <h2>HOLA</h2>
        {user&&finalizado?
        
            isAdmin? <Navigate to='/admin/post-products' />  : <Navigate to='/home' />   :
            null   
        }
        </div>
    )
}