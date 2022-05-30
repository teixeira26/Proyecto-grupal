import React from "react";
import styles from "./ProductDetailCard.module.css";

const ProductDetailCard = ({profilePicture, name, price,category, stock, description}) => {
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
            <button className={styles.button}>-</button>
            <div className={styles.count}>1</div>
            <button className={styles.button}>+</button>
          </div>

          <div className={styles.detailAddCart}>
            <button className={styles.addButtonNow}>Comprar ahora</button>
            <button className={styles.addButtonCart}>Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailCard;
