import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import styles from "./ProductDetailCard.module.css";
import { TYPES } from '../../redux/actions/shoppingActions';
import {useAuth0} from "@auth0/auth0-react";
import { getProducts, chargeCart} from "../../redux/actions/petshopActions";
import Swal from 'sweetalert2'


const ProductDetailCard = ({profilePicture, name, price,category, stock, description, id}) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const {user} = useAuth0()
  const cart = useSelector(state=>state.cart);
  const cartItem = cart.find(x=>x.id===id)

  useEffect(() => {
    dispatch(getProducts());
    dispatch(chargeCart(user.email));
  }, [dispatch, user.email]);


  const addItem = ()=>{
    console.log(cartItem)
    if(cartItem) {var limit = cartItem.stock - cartItem.quantity}
    else { var limit = stock}
    if(count<limit){
    setCount(count +1)}
    else{
      Swal.fire(`la cantidad deseada excede al limit del stock`)
    }
  }

  const delItem = ()=>{
    if(count>0){
    setCount(count -1)
    }
  }
  return (
    <div>
      <div className={styles.detailFlex}>
        <img src={profilePicture} alt="" className={styles.detailImg} />

        <div className={styles.detailRight}>
          <h3 className={styles.detailCategory}>{category}</h3>
          <h1 className={styles.detailTitle}>{name}</h1>
          <p className={styles.detailInfo}>
            {description}
          </p>

          <p className={styles.detailPrice}>${price}</p>

          <p className={styles.detailQuantity}>Seleccionar Cantidad</p>
          <p className={styles.stock}>Stock disponible: {stock}</p>
          <div className={styles.productQuantity}>
            <button className={styles.button} onClick={delItem}>-</button>
            <div className={styles.count}>{count}</div>
            <button className={styles.button} onClick={addItem}>+</button>
          </div>

          <div className={styles.detailAddCart}>
            <button className={styles.addButtonNow}>Comprar ahora</button>
            <button className={styles.addButtonCart} onClick={()=>{
              if(count > 0){
              dispatch({
              type:TYPES.ADD_TO_CART,
              payload:id,
              email:user.email,
              quantity:count,
            })}
            else{
              Swal.fire(`Aseguráte de agregar una cantidad antes de agregar el producto al carrito`)
            }
            }}

              >Agregar al carrito</button>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
