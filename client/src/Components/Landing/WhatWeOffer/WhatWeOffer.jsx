import React from "react";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../WhatWeOffer/WhatWeOffer.module.css";

const WhatWeOffer = () => {
  return (
    <div className={InContainer.container}>
      <h2 className={styles.wwoTitle}>
        Lorem ipsum dolor sit amet <br /> consectetur adipisicing elit.
      </h2>

      <section className={styles.wwoFlex}>
        <div className={styles.wwoGrid}>
          <div className={styles.wwoImgContainer}>
            <span className={styles.wwoImg}>IMG</span>
          </div>

          <p className={styles.wwoText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            deserunt explicabo maiores voluptate harum quaerat eum reiciendis
            amet nam eligendi!
          </p>
        </div>

        <div className={styles.wwoGrid}>
          <div className={styles.wwoImgContainer}>
            <span className={styles.wwoImg}>IMG</span>
          </div>

          <p className={styles.wwoText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            deserunt explicabo maiores voluptate harum quaerat eum reiciendis
            amet nam eligendi!
          </p>
        </div>

        <div className={styles.wwoGrid}>
          <div className={styles.wwoImgContainer}>
            <span className={styles.wwoImg}>IMG</span>
          </div>

          <p className={styles.wwoText}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            deserunt explicabo maiores voluptate harum quaerat eum reiciendis
            amet nam eligendi!
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhatWeOffer;
