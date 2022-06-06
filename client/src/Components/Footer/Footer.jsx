import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerFlex}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerSign}>
            {/* Enterate de todas <br /> nuestras novedades! */}
            yumpaw
          </h2>
          <p className={styles.newsletter}>
            {/* ¡Suscribite a nuestro Newsletter! */}
            Matheus, Leo, Sabri, Alan, Frano
          </p>

          {/* <div>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.email}
            />
            <button className={styles.submit}>Suscribirme</button>
          </div> */}
        </div>
        <div className={styles.footerMid}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#wwo" className={styles.navLink}>
                Que ofrecemos
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#team" className={styles.navLink}>
                Equipo
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.footerRight}>
          <a href="#">
            <img
              src="../assets/img/arrow-up.svg"
              alt="Go Up"
              className={styles.goUp}
            />
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>Copyright @yumPaw - 2022</p>
        <div className={styles.social}>
          <ion-icon name="logo-github"></ion-icon>
        </div>

        <div className={styles.social}>
          <ion-icon name="logo-instagram" className={styles.social}></ion-icon>
        </div>
      </div>
    </div>
  );
};

export default Footer;
