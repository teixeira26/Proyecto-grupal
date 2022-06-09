import React, { useEffect } from "react";
import styles from "./NavBarShop.module.css";
import OutContainer from "../GlobalCss/OutContainer.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTofavorites, chargeCart } from "../../redux/actions/petshopActions";
import axios from "axios";

function NavBar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const [total, setTotal] = useState(0);
  const [productsFavNumber, setProductsFavNumber] = useState(0);
  const [userData, setUser] = useState({});
  const state = useSelector((state) => {
    return state;
  });
  const [favorites, setFavorites] = useState([]);
  useEffect(()=>{
    if(user && user.email){
    axios
      .get(`http://localhost:3001/owners/getFavorites/${user.email}`)
      .then((x) => {
        console.log(x.data);
        setFavorites(x.data);
        dispatch(addTofavorites(x.data))
      })};

  }, [user])

  useEffect(() => {
    if(user){
      dispatch(chargeCart(user.email))
      axios.get('http://localhost:3001/owners').then(x=>{
    
    const userdb = x.data.find(x=>x.email === user.email);
        console.log(userdb)
        if(userdb){
        setUser({
            nombre:user.name,
            picture:userdb.profilePicture&&userdb.profilePicture[0]?userdb.profilePicture[0]:'/assets/img/notloged.png',
            email:user.email,
            pets:userdb.pets,
            address:userdb.address,
        })
        console.log('userdb', userdb)}

    })
    }
    // axios.get(`http://localhost:3001/owners/getFavorites/${user.email}`).then(x=>{
    //     setProductsFavNumber(x.data)})
    
  }, [dispatch, user])

  useEffect(() => {
    let counter = 0;
    state.cart.forEach((el) => {
      counter = counter + el.quantity;
    });
    setTotal(counter);
  }, [state.cart]);

  useEffect(() => {
    setProductsFavNumber(state.favorites? state.favorites.length : 0);
  }, [state.favorites]);

  console.log('state.favorites',state.favorites)

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
                <img src="../../assets/img/shopping-bag.svg" alt="" />
              </NavLink>

              <div className={styles.circle}>{total}</div>
            </div>

            <div className={styles.icon}>
              <NavLink to="/favorites" className={styles.navLinkIcon}>
                <img src="../../assets/img/favorite.svg" alt="" />
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
                  src={userData.picture}
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
