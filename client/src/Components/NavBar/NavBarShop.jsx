import React, { useEffect } from "react";
import styles from "./NavBarShop.module.css";
import Button from "../GlobalCss/Button.module.css";
import global from "../GlobalCss/Global.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chargeCart } from "../../redux/actions/petshopActions";
import axios from "axios";

function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [total, setTotal] = useState(0);
  const [productsFavNumber, setProductsFavNumber] = useState(0)
  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    if(user.email){
      dispatch(chargeCart(user.email))
    }
    // axios.get(`http://localhost:3001/owners/getFavorites/${user.email}`).then(x=>{
    //     setProductsFavNumber(x.data)})
    
  }, [dispatch, user.email])

  useEffect(() => {
    let counter = 0;
    state.cart.forEach((el) => {
      counter = counter + el.quantity;
    });
    setTotal(counter);
  }, [state.cart]);

  useEffect(() => {
    setProductsFavNumber(state.favorites.length);
  }, [state.favorites]);

  return (
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <div className={styles.item}>
          <NavLink to="/home" className={styles.logoLink}>
            yumPaw
          </NavLink>
        </div>

        <div className={styles.item}>
          <NavLink to="/about" className={styles.navLink}>
            Acerca de
          </NavLink>

          <NavLink to="/contact" className={styles.navLink}>
            Contacto
          </NavLink>

          <NavLink to="/shop" className={styles.navLink}>
            Shop
          </NavLink>
        </div>

        <div className={styles.item}>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <NavLink to="/shoppingcart" className={styles.navLinkIcon}>
                <ion-icon name="bag-handle-outline"></ion-icon>
              </NavLink>

              <div className={styles.circle}>{total}</div>
            </div>

            <div className={styles.icon}>
              <NavLink to="/favorites" className={styles.navLinkIcon}>
                <ion-icon name="heart-outline"></ion-icon>
              </NavLink>
              <div className={styles.circle}>{productsFavNumber}</div>
            </div>
          </div>

          <div>
            {!isAuthenticated && <img src="" alt=""></img>}
            {isAuthenticated && (
              <NavLink to="/profile" className={styles.profile}>
                <img
                  className={styles.profilePicture}
                  src={isAuthenticated && user.picture}
                  alt=""
                ></img>
              </NavLink>
            )}
          </div>

          <div className={styles.buttons}>
            {!isAuthenticated && <Login></Login>}
            {isAuthenticated && <Logout></Logout>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
