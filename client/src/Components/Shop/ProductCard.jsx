import React from "react";
import styles from "../Shop/ProductCard.module.css";

const ProductCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="" alt="" className={styles.cardImg} />
        <img src="/assets/heart.png" alt="" className={styles.addFav}/>
        <div className={styles.cardInfo}>
          <h2 className={styles.cardTitle}>Lorem Ipsum</h2>
          <div className={styles.cardBottom}>
            <p className={styles.price}>$1500</p>
            <button className={styles.addButton}>Agregar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
