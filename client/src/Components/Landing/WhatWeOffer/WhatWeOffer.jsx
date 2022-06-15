import React from "react";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../WhatWeOffer/WhatWeOffer.module.css";

const WhatWeOffer = (props) => {
  return (
    <div className={InContainer.container}>
      <h2 className={styles.wwoTitle}>
        Encontrá lo mejor  para tus mascotas.
      </h2>

      <section className={styles.wwoFlex}>
        <div className={styles.wwoGrid}>
          <div className={styles.wwoImgContainer}>
            <img src="/assets/img/paseador.png" alt="" className={styles.wwoImg}/>
          </div>

          <p className={styles.wwoText}>
            Conseguí paseadores calificados y de confianza. Vas a tener la posibilidad de buscarlos cerca de tu casa de una forma sencilla y rápida.
          </p>
        </div>

        <div className={styles.wwoGrid}>
        <div className={styles.wwoImgContainer}>
            <img src="/assets/img/host.png" alt="" className={styles.wwoImg}/>
          </div>

          <p className={styles.wwoText}>
            Si no tenés con quien dejar a tu mascota, te damos la seguridad de que nuestros yumpis la cuidarán muy bien en sus hogares.
          </p>
        </div>

        <div className={styles.wwoGrid}>
        <div className={styles.wwoImgContainer}>
            <img src="/assets/img/shop.png" alt="" className={styles.wwoImg}/>
          </div>

          <p className={styles.wwoText}>
            ¿Necesitás hacer alguna compra? En nuestro Petshop conseguirás de todo: alimentos, accesorios y cuidados para la salud.
          </p>
        </div>
      </section>
    </div>
  );
};

export default WhatWeOffer;
