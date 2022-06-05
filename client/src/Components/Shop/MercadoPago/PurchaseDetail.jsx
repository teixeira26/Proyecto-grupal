import { useSelector } from "react-redux";


export default function PurchaseDetail({name, quantity, price, image}){

    const cart = useSelector(state => state.cart)


    return(

        
        <div>
        <img src={image} alt="Pet App" width="55" height="50" />
        <h3>Producto: {name}</h3>
        <h4>Cantidad: {quantity}</h4>
        <h4>Total: {price * quantity}</h4>

        </div>
    )


}