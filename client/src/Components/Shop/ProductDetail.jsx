import React from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/ProductDetail.module.css";
import ProductDetailCard from "./ProductDetailCard";

import { useSelector } from "react-redux";

const ProductDetail = () => {
  const products = useSelector((state) => state.filteredProducts);
  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
        <span>Atras</span>
        
        <ProductDetailCard />
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
