import React, { useEffect } from "react";
import styles from "./NavBarShop.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTofavorites, chargeCart } from "../../redux/actions/petshopActions";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import Swal from "sweetalert2";

function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [total, setTotal] = useState(0);
  const [productsFavNumber, setProductsFavNumber] = useState(0);
  const [userData, setUser] = useState({});
  const navigate = useNavigate()
  const state = useSelector((state) => {
    return state;
  });
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3001/owners/getFavorites/${user.email}`)
        .then((x) => {
          console.log(x.data);
          setFavorites(x.data);
          dispatch(addTofavorites(x.data));
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:3001/owners").then((x) => {
        const userdb = x.data.find((x) => x.email === user.email);
        if (userdb) {
          setUser({
            nombre: user.name,
            picture:
              userdb.profilePicture && userdb.profilePicture[0]
                ? userdb.profilePicture[0]
                : "/assets/img/notloged.png",
            email: user.email,
            pets: userdb.pets,
            address: userdb.address,
          });
        }
      });
    }
    // axios.get(`http://localhost:3001/owners/getFavorites/${user.email}`).then(x=>{
    //     setProductsFavNumber(x.data)})
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(chargeCart("cart"));
  }, [dispatch]);

  useEffect(() => {
    let counter = 0;
    state.cart.forEach((el) => {
      counter = counter + el.quantity;
    });
    setTotal(counter);
  }, [state.cart]);

  useEffect(() => {
    setProductsFavNumber(state.favorites ? state.favorites.length : 0);
  }, [state.favorites]);

  return (
    <div className={OutContainer.container}>
      <nav className={styles.nav}>
        <div className={styles.item}>
          <NavLink to={user?'/inicio':'/'} className={styles.logoLink} >
            yumPaw
          </NavLink>
        </div>

        <div className={styles.item}>
          <NavLink to="/nosotros" className={styles.navLink}>
            Acerca de
          </NavLink>

          <NavLink to="/contacto" className={styles.navLink}>
            Contacto
          </NavLink>

          <NavLink to={user?'/providers':'/'} className={styles.navLink} onClick={()=>{if(!user)Swal.fire('necesitás ingresar a la página para ver a los yumpys')}}>
            Yumpys
          </NavLink>

          <NavLink to="/shop" className={styles.navLink}>
            PetShop
          </NavLink>
        </div>

        <div className={styles.item}>
          <div className={styles.icons}>
            <div className={styles.icon}>
              <NavLink to="/mi-carrito" className={styles.navLinkIcon}>
                <img src="../../assets/img/shopping-bag.svg" alt="" />
              </NavLink>

              <div className={styles.circle}>{total}</div>
            </div>

            <div className={styles.icon}>
              <NavLink to="/favoritos" className={styles.navLinkIcon}>
                <img src="../../assets/img/favorite.svg" alt="" />
              </NavLink>
              <div className={styles.circle}>{productsFavNumber}</div>
            </div>
          </div>

          {/* <div>
            {!isAuthenticated && <img src="" alt=""></img>}
            {isAuthenticated && (
              <NavLink to="/mi-perfil" className={styles.profile}>
                <img
                  className={styles.profilePicture}
                  src={userData.picture}
                  alt=""
                ></img>
              </NavLink>
            )}
          </div> */}

          <div className={styles.buttons}>
            {!isAuthenticated && <Login></Login>}
            {isAuthenticated && <DropdownMenu/>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
