import { useSelector, useDispatch } from "react-redux"
import {useEffect} from 'react'
import { getProviders } from "../../redux/actions/ownProvActions"


export default function RegisteredUser({name, lastName, email, providers, banear}){

    let isProv = providers.find(el =>{
           return el.email === email
        })


    return(
        <>
            <h3>{name}</h3>
            <h3>{lastName}</h3>
            <h3>{email}</h3>
            <h3>ofrece servicios: {isProv? 'SÍ' : 'NO'}</h3>
            <button  onClick={banear}>BANEAR</button>

        </>
    )
}