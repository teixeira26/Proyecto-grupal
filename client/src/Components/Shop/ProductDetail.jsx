import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/ProductDetail.module.css";



const ProductDetail = () => {
  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
        <span>Atras</span>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
