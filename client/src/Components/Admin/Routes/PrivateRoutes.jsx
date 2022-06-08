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


    const searchUser = () => {
       
          axios.get("http://localhost:3001/owners")
          .then(res =>{
            console.log('res',res)

             let resp = res.data.find((x) => x.email === user.email)
             return resp

            //          console.log('resp.isAdmin',resp.isAdmin)

            // setIsAdmin(resp.isAdmin)

            // console.log('isAdmin',isAdmin)


            // console.log('user',user)

          })
        //   .then(res =>{
        //     console.log('res2',res)            
        //     console.log('reres.isAdmins2',res.isAdmin)


        //     console.log('isAdmin',isAdmin)

        //   })
          
            
      };

    useEffect(() => {
        if(user){
            let us = searchUser()
            console.log('UUUSS', us)
            // setIsAdmin(us.isAdmin)
        }
      }, [user, isAdmin]);


    return (
        <div> <h2>HOLA</h2>
        {user?
        
            isAdmin? <Navigate to='/admin/post-products' /> : <Navigate to='/home' />   :
            null   
        }
        </div>
    )
}