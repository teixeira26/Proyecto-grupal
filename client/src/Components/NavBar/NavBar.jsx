import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

import { NavLink } from 'react-router-dom';

import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";

import styles from "./NavBar.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";

function NavBar() {
  const { isAuthenticated} = useAuth0();
  return (
    
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <span className={styles.logo}>iPet</span>
        <section className={styles.contents}>
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
            <li className={styles.navItem}>
              <a href="/shop" className={styles.navLink}>
                Petshop
              </a>
            </li>
          </ul>
          <div className={styles.buttons}>
          {!isAuthenticated&&<Login></Login>}
          {isAuthenticated&&<Logout></Logout>}
          </div>
          <NavLink to="/shoppingcart">
            <ion-icon name="bag-handle-outline"></ion-icon>
          </NavLink>
        </section>
      </nav>
    </div>
  );
}

export default NavBar;
