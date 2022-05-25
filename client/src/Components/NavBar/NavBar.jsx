import React from "react";
import styles from "./NavBar.module.css";
import Button from "../GlobalCss/Button.module.css";
import global from "../GlobalCss/Global.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";

function NavBar() {
  return (
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <span>LOGO</span>

        <section className={styles.contents}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Link1
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Link2
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Link3
              </a>
            </li>
          </ul>

          <div className={styles.buttons}>
            <button className={Button.button}>Registrarse</button>
            <button>Iniciar Sesion</button>
          </div>
        </section>
      </nav>
    </div>
  );
}

export default NavBar;
