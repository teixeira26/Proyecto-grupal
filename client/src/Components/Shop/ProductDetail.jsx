import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/ProductDetail.module.css";
import ProductDetailCard from "./ProductDetailCard";

import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [productID, setProductID] = useState(null);

  const{ id } = useParams();
  const fetchProductDetail = () => {
    const response = await axios.get(`http://localhost:3001/products/${id}`)
  }
  useEffect(() => {
    axios.get().then((res) => {
      setProductID(res.data);
    });
  }, [id]);

  console.log(productID);
  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
        <span>Atras</span>

        {!productID.length
          ? "LOADING"
          : productID.map((p) => {
              return (
                <ProductDetailCard
                  key={p.id}
                  profilePicture={p.profilePicture}
                  name={p.name}
                  price={p.price}
                />
              );
            })}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
