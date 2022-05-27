import React, {useEffect} from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Landing/Footer/Footer";
import ShopCategoriesCard from "./ShopCategoriesCard";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css"
import ProductCard from "./ProductCard";
import { getProducts } from "../../redux/actions/petshopActions";
import { useDispatch, useSelector } from "react-redux";


const Shop = () => {

  const products = useSelector(state => state.products)

  let dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getProducts())
  }, [dispatch])



  console.log(products)
  return (
    <div className={styles.container}>
      <NavBar />
      <section className={inContainer.container}>
        <h1 className={styles.shopTitle}>Pet Shop</h1>
        <div className={styles.categoriesWrapper}>
          <ShopCategoriesCard/>
          <ShopCategoriesCard/>
          <ShopCategoriesCard/>
        </div> 

        <div className={styles.product}>

        {!products.length? 'LOADING' :

          products.map( p => {
            return (
            <ProductCard key={p.id}
                         profilePicture={p.profilePicture}
                         name={p.name}
                         price={p.price}/>)
          })
        }

          <p className={styles.seeAll}>Ver todos</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Shop;
