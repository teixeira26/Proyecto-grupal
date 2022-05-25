import React from "react";
import styles from "../Team/TeamCard.module.css";;

const TeamCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img src="" alt="imagen" className={styles.cardImg} />

        <section className={styles.cardBottom}>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardName}>Lionel Messi</h2>
            <p className={styles.cardLocation}>Buenos Aires, Argentina</p>
            <p className={styles.cardTel}>012345678</p>
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
