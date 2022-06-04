import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { addOneItem, deleteItem, removeFromCart } from "../../redux/actions/petshopActions";
import styles from "../Shop/ProductDetailCard.module.css"
import Swal from 'sweetalert2'


const CartItem = ({name, image, price, quantity, id, stock}) => {
const {user} = useAuth0()
const dispatch = useDispatch()
const cart = useSelector(state=>state.cart);
const cartItem = cart.find(x=>x.id===id)


    const delFromCart = (id) => {

        dispatch(removeFromCart(id, user.email))
    }

    // const addItem = (id)=>{
    //     dispatch(addOneItem(id))
    //   }
    
    //   const delItem = (id)=>{
   
    //     dispatch(deleteItem(id))
        
    //   }
    
console.log('quantity', quantity)
    
    return (
        <div>
            <div style={{ borderBottom: "thin solid gray" }}>
                <img src={image} alt="Pet App" width="150" height="200" />
                <h4>{name}</h4>
                <h5>precio x 1un. ${price}.00</h5>
                <h5>total: x {quantity}un. ${price * quantity}.00</h5>
                <button onClick={() => delFromCart(id)}>X</button>
                {/* <div>
                <button className={styles.button} onClick={delItem}>-</button>
                <button className={styles.button} onClick={addItem}>+</button>

                </div> */}
            </div>
        </div>
    )
};

export default CartItem;