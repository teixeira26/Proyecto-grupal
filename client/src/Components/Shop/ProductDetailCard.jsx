import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ProductDetailCard.module.css";
import { TYPES } from '../../redux/actions/shoppingActions';

const ProductDetailCard = ({profilePicture, name, price,category, stock, description, id}) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const addItem = ()=>{
    if(count<stock){
    setCount(count +1)}
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
              dispatch({
              type:TYPES.ADD_TO_CART,
              payload:id})}}
              >Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
