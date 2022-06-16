import React from "react";
import styles from "../Team/TeamCard.module.css";

const TeamCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <img src={props.img} alt="imagen" className={styles.cardImg} />

        <section className={styles.cardBottom}>
          <div className={styles.cardInfo}>
            <h2 className={styles.cardName}>{props.name}</h2>
            <p className={styles.cardLocation}>{props.location}</p>
            <p className={styles.cardTel}>{props.contact}</p>
            <div className={styles.cardSocial}>
              <div className={styles.bottom}>
                <a href="">
                  <img
                    src="./assets/img/logo-linkedin.svg"
                    alt=""
                    className="margin-right"
                  />
                </a>

                <a href={props.link} target="__blank">
                  <img src="./assets/img/logo-github.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamCard;
