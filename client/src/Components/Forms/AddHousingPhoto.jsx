import { useAuth0 } from "@auth0/auth0-react";
import { Widget } from "@uploadcare/react-widget";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { putProvider } from "../../redux/actions/ownProvActions";


export default function AddHousingPhoto(){
    const {user} = useAuth0()
    const [photo, setPhoto] = useState('')
    const [infoUser, setInfoUser] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            axios.get('http://localhost:3001/providers?filter=&order=ASC').then(x=>{
                setInfoUser(x.data.find(x=>x.email === user.email))
            })
        }
    },[user])
    const submitPhoto = ()=>{
        let newInfoUser = {
            ...infoUser,
            housingPhotos:[...infoUser.housingPhotos, photo],
        }
        Swal.fire({
            title: '¿Estás seguro que querés agregar esta foto ?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: `No`,
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('¡La foto fue guardada correctamente!', '', 'success')
              dispatch(putProvider(newInfoUser));
              navigate('/mi-perfil')
            } else if (result.isDenied) {
              Swal.fire('No se ha guardado la foto.', '', 'info')
            }
          })
        
    }
    return(
    <div>
         <Widget
              publicKey="269841dc43864e62c49d"
              id="file"
              name="photos"
              onChange={(e) => {
                setPhoto(e.originalUrl);
                console.log(e);
              }}
              perrito="profilePicture"
            />
            {photo && <img src = {photo}></img>}
            {photo && infoUser&&<input type='button' onClick={()=>submitPhoto()} value='AGREGAR FOTO'/>}
    </div>)
}