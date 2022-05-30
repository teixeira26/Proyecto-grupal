import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/ProductDetail.module.css";
import ProductDetailCard from './ProductDetailCard'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions/ownProvActions";

const ProductDetail = () => {

  let { id } = useParams();

  let dispatch = useDispatch()

  const product = useSelector(state => state.filteredProducts)

  useEffect( () => {
    dispatch(getById(id))

  // return () =>{
  //   setProductID(null) //cleanup si trabajan con redux
  // }
  }, [dispatch]);

  console.log('product', product);

  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
        <span>Atras</span>

        {!product.length
          ? "LOADING"
          : product.map((p) => {
              return (
                <ProductDetailCard
                  key={p.id}
                  profilePicture={p.profilePicture}
                  description={p.description}
                  name={p.name}
                  price={p.price}
                  category={p.category}
                  stock={p.stock}
                />
              );
            })}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
