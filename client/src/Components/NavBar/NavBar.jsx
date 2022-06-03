import React from "react";
import styles from "./NavBar.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";
import {useAuth0} from '@auth0/auth0-react'
import Login from "../Auth0/Login"
import Logout from "../Auth0/Logout"

function NavBar() {
  const { isAuthenticated} = useAuth0();
  return (
    
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <span className={styles.logo}>iPet</span>

        <section className={styles.contents}>
          <ul className={styles.navList}>
            {/* <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Acerca de nosotros
              </a>
            </li> */}
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

          <div className={styles.buttons}>
          {!isAuthenticated&&<Login></Login>}
      {isAuthenticated&&<Logout></Logout>}
          </div>
        </section>
      </nav>
    </div>
  );
}

export default NavBar;
