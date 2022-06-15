import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getProducts,
  chargeCart,
  getFavoritesProducts,
  addTofavorites,
} from "../../redux/actions/petshopActions";
import NavBarShop from "../NavBar/NavBarShop";
import ShopFilters from "./ShopFilters";
import ProductCard from "./ProductCard";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/Shop.module.css";
import NoResults from "../../Views/Profile/NoResultsShop";
import Paginated from "../Paginated";
import NoResultsShop from "../../Views/Profile/NoResultsShop";

const Shop = () => {
  const products = useSelector((state) => state.filteredProducts);
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState([]);

  let dispatch = useDispatch();
  useEffect(() => {
    if (favorites) {
      dispatch(addTofavorites(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get(`http://localhost:3001/owners/getFavorites/${user.email}`)
        .then((x) => {
          console.log(x.data);
          setFavorites(x.data);
        });
      // dispatch(getProducts());
      dispatch(chargeCart("cart"));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const [currentPage, setCurrentPage] = useState(1);
  const initialStateProductsPerPage = 12;
  const [productsPerPage, setProductsPerPage] = useState(
    initialStateProductsPerPage
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <h1 className={styles.shopTitle}>
          ¡Encontrá lo mejor para tus mascotas!
        </h1>
        

        <div className={styles.shopFlex}>
          <div className={styles.shopFilters}>
            <ShopFilters />
          </div>
          <br />
          <section className={styles.shopGrid}>
            {!currentProducts.length
              ? <NoResultsShop/>
              : currentProducts.map((p) => {
                  console.log(p);
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
        <div className={styles.paginado}>
          <Paginated
            itemsPerPage={productsPerPage}
            items={products.length}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
