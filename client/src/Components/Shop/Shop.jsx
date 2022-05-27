import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Landing/Footer/Footer";
import ShopCategoriesCard from "./ShopCategoriesCard";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css"
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";


const Shop = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <section className={inContainer.container}>
        <h1 className={styles.shopTitle}>Pet Shop</h1>
        <div className={styles.categoriesWrapper}>
          <Link to='/food'>
            <ShopCategoriesCard/>
          </Link>
          <ShopCategoriesCard/>
          <ShopCategoriesCard/>
        </div> 

        <div className={styles.product}>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <p className={styles.seeAll}>Ver todos</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Shop;
