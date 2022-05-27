import React from "react";
import styles from "../Home/HomeCard.module.css";

const HomeCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="" alt="" className={styles.cardImg} />
        <h2 className={styles.cardTitle}>Lorem</h2>
      </div>
    </div>
  );
};

export default HomeCard;
