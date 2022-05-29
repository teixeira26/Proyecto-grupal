import React from "react";
import styles from "../Shop/ProductCard.module.css";

const ProductCard = ({profilePicture, name, price}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={profilePicture} alt="" className={styles.cardImg} />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png" alt="" className={styles.addFav}/>
        <div className={styles.cardInfo}>
          <h2 className={styles.cardTitle}>{name}</h2>
          <div className={styles.cardBottom}>
            <p className={styles.price}>${price}</p>
            {/* <button className={styles.addButton}>Agregar al carrito</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
