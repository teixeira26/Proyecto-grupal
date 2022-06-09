import NavBarShop from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import { useSelector } from 'react-redux';


export default function SalesReceipts(){
    const authUser = useSelector(state => state.authUser)
    console.log("authuser", authUser)


    return <h3>COMPROBANTES DE VENTAS Y TRANSACCIONES</h3>
}