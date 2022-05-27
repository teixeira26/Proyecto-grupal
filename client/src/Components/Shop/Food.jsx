import React from "react";
import NavBar from "../NavBar/NavBar";
import FoodCard from "./FoodCard";
import Footer from "../Landing/Footer/Footer";
import styles from "../Shop/Food.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import ShopFilters from "./ShopFilters";

const Food = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <section className={inContainer.container}>
        <h1 className={styles.shopTitle}>Lorem</h1>

        <section className={styles.foodFlex}>
          <div className={styles.foodWrapper}>
            <div className={styles.filter}>
              <ShopFilters />
            </div>

            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
            <FoodCard />
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
};

export default Food;
