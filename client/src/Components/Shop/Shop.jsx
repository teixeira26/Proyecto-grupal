import React, { useEffect, useState } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import stylesFilters from "./ShopFilters.module.css";
import styles from "../Shop/Shop.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import ProductCard from "./ProductCard";
import { getProducts, filterByPet } from "../../redux/actions/petshopActions";
import { useDispatch, useSelector } from "react-redux";
import ShopSearchbar from "./ShopSearchbar";

const Shop = () => {
  const products = useSelector((state) => state.filteredProducts);
  const [order, setOrder] = useState("ASC");
  const [filter, setFilter] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(filter, order));
  }, [dispatch, filter, order]);

  function handleFilter(e) {
    console.log(e.target.value);
    setFilter(e.target.value);
  }

  function handleOrder(e) {
    setOrder(e.target.value);
  }

  function handleRemove(e) {
    e.preventDefault();
    dispatch(getProducts('', ''))
  }

  let select = [];
  function checkPet(e) {
    let selection = e.target.value;
    let alredy = select.includes(selection);

    console.log("alredy", alredy);

    if (!alredy) select.push(e.target.value);
    if (alredy) {
      select = select.filter((el) => el !== selection);
    }

    dispatch(filterByPet([select]));
  }

  console.log(products);
  return (
    <div className={styles.container}>
      <NavBarShop />

      <div className={inContainer.container}>
        <span>Atras</span>

        <h1 className={styles.shopTitle}>Pet Shop</h1>

        <div className={styles.shopFlex}>
          <div className={styles.shopFilters}>
            <ShopSearchbar />
            <br />
            <div className={stylesFilters.container}>
              <section className={stylesFilters.selects}>
                <p className={stylesFilters.filterTitle}>Filtrar por</p>
                <div className={stylesFilters.checkbox}>
                  <input
                    type="checkbox"
                    value="perro"
                    onChange={checkPet}
                    className={stylesFilters.inputCheck}
                  />
                  <span className={stylesFilters.checkTitle}>Perro</span>
                </div>

                <div className={stylesFilters.checkbox}>
                  <input
                    type="checkbox"
                    value="gato"
                    onChange={checkPet}
                    className={stylesFilters.inputCheck}
                  />
                  <span className={stylesFilters.checkTitle}>Gato</span>
                </div>

                <div className={stylesFilters.checkbox}>
                  <input
                    type="checkbox"
                    value="conejo"
                    onChange={checkPet}
                    className={stylesFilters.inputCheck}
                  />
                  <span className={stylesFilters.checkTitle}>Conejo</span>
                </div>

                <div className={stylesFilters.checkbox}>
                  <input
                    type="checkbox"
                    value="tortuga"
                    onChange={checkPet}
                    className={stylesFilters.inputCheck}
                  />
                  <span className={stylesFilters.checkTitle}>Tortuga</span>
                </div>
              </section>

              <section className={stylesFilters.selects}>
                <select name="" id="" className={stylesFilters.select} onChange={handleFilter}>
                  <option disabled selected>
                    Categoría
                  </option>
                  <option value="alimento">Alimento</option>
                  <option value="accesorios">Accesorios</option>
                  <option value="salud y bienestar">Salud Y Bienestar</option>
                </select>
              </section>

              <section className={stylesFilters.selects} onChange={handleOrder}>
                <p className={stylesFilters.filterTitle}>Ordenar por</p>

                <select name="" id="" className={stylesFilters.select}>
                  <option disabled selected>
                    Precio
                  </option>
                  <option value="ASC">Ascendente</option>
                  <option value="DESC">Descendente</option>
                </select>
              </section>
            </div>

            <button onClick={handleRemove}>Remover filtros</button>

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
