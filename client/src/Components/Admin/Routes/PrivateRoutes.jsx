import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, getOwners } from "../../../redux/actions/ownProvActions";
import React, { useEffect, useState } from "react";
import axios from "axios";



export default function PrivateRoutes({redirectPath = "/admin",  children}){
    const dispatch = useDispatch()
    const { user, isAuthenticated } = useAuth0();

    const [isAdmin, setIsAdmin] = useState(false)
    const [finalizado, setFinalizado] = useState(false)


    

    useEffect(() => {
      const searchUser = () => {
       
        axios.get("http://localhost:3001/owners")
        .then(res =>{
          // console.log('res',res)
          console.log('ISADMIIIIIIIN', isAdmin)

          let resp = res.data.find((x) => x.email === user.email)
          console.log(resp, "USUARIIOOOOOO")
          //  return resp

          console.log('RESPUESTA RESP.ISADMIN',resp.isAdmin)

          setIsAdmin(resp.isAdmin)
          setFinalizado(true)
          console.log(resp.isAdmin, "RESPUESTA DESPUES DEL SETISADMIN")
          console.log('isAdmin',resp.isAdmin)

        })
        // .then(res =>{
        //   console.log('res2',res)            
        //   console.log('reres.isAdmins2',res.isAdmin)


        //   console.log('isAdmin',isAdmin)

        // })
        
          
    };
        if(user){
            searchUser()
            // console.log('UUUSS', us)
            // setIsAdmin(us.isAdmin)
        }
      }, [user]);


    return (
        <div> <h2>HOLA</h2>
        {user&&finalizado?
        
            isAdmin? <Navigate to='/admin/post-products' /> : <Navigate to='/home' />   :
            null   
        }
        </div>
    )
}