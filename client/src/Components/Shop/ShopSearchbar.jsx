import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { searchBarProducts } from "../../redux/actions/petshopActions";
import styles from "./ShopFilters.module.css";

const ShopSearchbar = () => {

  const dispatch = useDispatch();
  const [inputSearchBar, setInputSearchBar] = useState('');

  useEffect(() => {
    dispatch(searchBarProducts(inputSearchBar))
  }, [dispatch, inputSearchBar]);

  function onInputChangeSearchbar(e) {
    e.preventDefault();
    setInputSearchBar(e.target.value)
  };

  return (
    <div className={styles.container}>
      <section className={styles.selects} >
        <p className={styles.filterTitle}>Buscar producto</p>
        <input
          type="text"
          placeholder="Ingresa tu búsqueda..."
          className={styles.search}
          onChange={onInputChangeSearchbar}
        />
      </section>
    </div>
  );
};

export default ShopSearchbar;