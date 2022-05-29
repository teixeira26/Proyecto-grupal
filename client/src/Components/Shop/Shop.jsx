import React, { useEffect } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import ShopFilters from "./ShopFilters";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import ProductCard from "./ProductCard";
import { getProducts } from "../../redux/actions/petshopActions";
import { useDispatch, useSelector } from "react-redux";
import ShopSearchbar from "./ShopSearchbar";

const Shop = () => {
  const products = useSelector((state) => state.filteredProducts);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);
  return (
    <div className={styles.container}>
      <NavBarShop/>

      <div className={inContainer.container}>
        <span>Atras</span>

        <h1 className={styles.shopTitle}>Pet Shop</h1>

        <div className={styles.shopFlex}>
          <div className={styles.shopFilters}>
          
            <ShopSearchbar />
            <br />
            <ShopFilters />


          </div>
          <section className={styles.shopGrid}>
            {!products.length
              ? "LOADING"
              : products.map((p) => {
                  return (
                    <a href={`http://localhost:3000/shop/${p.id}`} key={p.id}>
                      <ProductCard
                        key={p.id}
                        profilePicture={p.profilePicture}
                        name={p.name}
                        price={p.price}
                      />
                    </a>
                  );
                })}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
