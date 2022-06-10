import NavBarShop from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import { useSelector } from 'react-redux';


export default function PostProducts(){
    const authUser = useSelector(state => state.authUser)
    console.log("authuser", authUser)


    return <h3>AGREGAR PRODUCTO</h3>
}