import React from "react";
import styles from "../Team/TeamCard.module.css";;

const TeamCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img src="" alt="imagen" className={styles.cardImg} />

        <section className={styles.cardBottom}>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardName}>{props.name}</h2>
            <p className={styles.cardLocation}>{props.location}</p>
            <p className={styles.cardTel}>{props.contact}</p>
          </div>

          <div className={styles.cardSocial}>
            <span className={styles.cardSocial__Item}>IN</span>
            <span className={styles.cardSocial__Item}>GT</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamCard;
