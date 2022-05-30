import React from "react";
import styles from "./ProductDetailCard.module.css";

const ProductDetailCard = ({profilePicture, name, price}) => {
  return (
    <div>
      <div className={styles.detailFlex}>
        <img src="" alt="" className={styles.detailImg} />

        <div className={styles.detailRight}>
          <h3 className={styles.detailCategory}>Category</h3>
          <h1 className={styles.detailTitle}>{name}</h1>
          <p className={styles.detailInfo}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            libero alias cum iusto porro reprehenderit laboriosam tempora.
            Totam, soluta voluptates reiciendis ut facere libero debitis.
          </p>

          <p className={styles.detailPrice}>$4500</p>

          <p className={styles.detailQuantity}>Seleccionar Cantidad</p>
          <p className={styles.stock}>Stock disponible: 5</p>
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
