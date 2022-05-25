import React from "react";
import styles from "../Footer/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerFlex}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerSign}>
            Lorem ipsum dolor sit amet, <br /> consectetur adipisicing elit.
          </h2>

          <input type="email" name="email" placeholder="E-mail" className={styles.email}/>
          <input type="submit" name="submit" className={styles.submit}/>
        </div>

        <div className={styles.footerMid}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <a href="" className={styles.navLink}>Link1</a>
                </li>
                <li className={styles.navItem}>
                    <a href="" className={styles.navLink}>Link2</a>
                </li>
                <li className={styles.navItem}>
                    <a href="" className={styles.navLink}>Link3</a>
                </li>
            </ul>
        </div>

        <div className={styles.footerRight}>
            <span>GO TOP</span>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyright}>Copyright Not Henryque</p>
        <span className={styles.social}>S</span>
        <span className={styles.social}>S</span>
        <span className={styles.social}>S</span>
      </div>
    </div>
  );
};

export default Footer;
