import React from "react";
import styles from "./NavBarRegistered.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";
import {useAuth0} from '@auth0/auth0-react'
import Login from "../Auth0/Login"
import Logout from "../Auth0/Logout"
import { NavLink } from "react-router-dom";

function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <NavLink to='/home' className={styles.logoLink}>iPet</NavLink>
        {/* <span>LOGO</span> */}

        <section className={styles.contents}>
          <ul className={styles.navList}>
            {/* <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Acerca de nosotros
              </a>
            </li> */}
            <li className={styles.navItem}>
              <NavLink to='/shop' className={styles.navLink}>Petshop</NavLink>
              {/* <a href="#" className={styles.navLink}>Petshop</a> */}
            </li>
            {/* <li className={styles.navItem}>
              <a href="#" className={styles.navLink}>
                Contacto
              </a>
            </li> */}
          </ul>
          <NavLink to='/profile'><img className={styles.profilePicture} src={isAuthenticated&&user.picture} alt='img not found'></img></NavLink>
          <div className={styles.buttons}>
            {!isAuthenticated && <Login></Login>}
            {isAuthenticated && <Logout></Logout>}
          </div>
        </section>
      </nav>
    </div>
  );
}

export default NavBar;
