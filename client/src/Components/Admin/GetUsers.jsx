import NavBar from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react'
import { getOwners, getProviders } from '../../redux/actions/ownProvActions';
import RegisteredUser from './RegisteredUser';
import axios from 'axios';

export default function GetUsers(){

    const dispatch = useDispatch()
    const users = useSelector(state => state.owners)


    useEffect(()=>{
        dispatch(getOwners())
        dispatch(getProviders())

    }, [dispatch])


    const providers = useSelector(state => state.providers)


    async function banear(id){
        await axios.delete(`http://localhost:3001/owners/${id}`, { isBanned: true });
        // dispatch(getOwners())
    }

    return (
    <div>
        <NavBar/>
        <h3>LISTA DE USUARIOS REGISTRADOS</h3>
        {users?.map(us =>{
            return <RegisteredUser name={us.name}
                            lastName={us.lastName}
                            email={us.email}
                            providers={providers}
                            banear={()=>banear(us.id)}
                            />}
        )

        }

        <Footer />
    </div>

)}