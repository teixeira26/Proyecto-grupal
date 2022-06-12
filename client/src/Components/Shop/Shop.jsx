import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import ProductCard from "./ProductCard";
import {
  getProducts,
  chargeCart,
  getFavoritesProducts,
  addTofavorites,
} from "../../redux/actions/petshopActions";
import { useDispatch, useSelector } from "react-redux";
import ShopSearchbar from "./ShopSearchbar";
import ShopFilters from "./ShopFilters";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Shop = () => {
  const products = useSelector((state) => state.filteredProducts);
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState([]);

  let dispatch = useDispatch();
  useEffect(()=>{
    if(favorites){
    dispatch(addTofavorites(favorites))}
  }, [favorites])
  useEffect(() => {
    axios
      .get(`http://localhost:3001/owners/getFavorites/${user.email}`)
      .then((x) => {
        console.log(x.data);
        setFavorites(x.data);
      });
    dispatch(getProducts());
    dispatch(chargeCart(user.email));
  }, [dispatch, user.email]);

  return (
    <div className={styles.container}>
      <NavBarShop />
      <div className={inContainer.container}>
        <NavLink to="/inicio">
          <img
            src="/assets/img/arrow-left.svg"
            alt=""
            className={styles.leftArrow}
          />
        </NavLink>
        <h1 className={styles.shopTitle}>Pet Shop</h1>
        <div className={styles.shopFlex}>
          <div className={styles.shopFilters}>
            <ShopSearchbar />
            <ShopFilters />
          </div>
          <br />
          <section className={styles.shopGrid}>
            {!products.length
              ? "LOADING"
              : products.map((p) => {
                console.log(p)
                  return p.stock > 0 && p.isActive ? (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      setFavorites={setFavorites}
                      favorites={favorites}
                      isFavorite={favorites && favorites.includes(p.id)}
                      profilePicture={p.profilePicture}
                      name={p.name}
                      price={p.price}
                    />
                  ) : null;
                })}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;