import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser, getOwners } from "../../../redux/actions/ownProvActions";
import { useEffect } from 'react'



export default function PrivateRoutes({redirectPath = "/admin",  children}){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOwners())
      }, [ dispatch]);

      const { user, isAuthenticated } = useAuth0();
      const admin = useSelector(state => state.owners)
  

      console.log('isAuthenticated', isAuthenticated)

    console.log('user', user)

     console.log('users', admin)


    const userdb = admin.find((x) => x.email === user.email);
    console.log('userDB', userdb)

    const isAdmin2 = userdb.isAdmin

    console.log('isAdmin', isAdmin2)




    return (
        <div> <h2>HOLA</h2>
        {
            isAdmin2? <Navigate to='/admin/post-products' /> : children     
        }
        </div>
    )
}