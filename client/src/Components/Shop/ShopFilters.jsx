import React from "react";
import { useDispatch } from "react-redux";
import { getProducts, sortByPrice, filterByCategory,filterTargetAnimal } from "../../redux/actions/petshopActions";
import styles from "./ShopFilters.module.css";
import { useState } from "react";

const ShopFilters = () => {
  let dispatch = useDispatch();

  let [select, setSelect] = useState([])

  function handleFilterTargetAnimal(e) {
    console.log(e.target.value);
    dispatch(filterTargetAnimal(e.target.value))
  };

  function handleOrder(e) {
    console.log(e.target.value)
    dispatch(sortByPrice(e.target.value))
  };

  function handleRemove(e) {
    e.preventDefault();
    dispatch(getProducts())
  };

        function checkCategory(e) {
          let selection = e.target.value;
          let alredy = select.includes(selection);
          console.log("alredy", alredy);
          if (!alredy) setSelect(select = [...select, e.target.value]);
          if (alredy) {
            let aux = select.filter((el) => el !== selection);
            setSelect(select = aux)
          }
          dispatch(filterByCategory(select));
        }
   

  return (
    <div className={styles.container}>

      <br />
      <section className={styles.selects}>
        <p className={styles.filterTitle}>Filtrar por</p>
        <select name="" id="" className={styles.select} onChange={handleFilterTargetAnimal}>
          <option disabled selected>
            Tipo de mascota
          </option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="tortuga">Tortuga</option>
          <option value="conejo">Conejo</option>
          <option value="pez">Peces</option>
          <option value="pajaro">Aves</option>

        </select>
      </section>


      <section className={styles.selects}>
        <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="alimento"
          onChange={checkCategory}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Alimento</span>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="accesorios"
          onChange={checkCategory}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Accesorios</span>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="salud y bienestar"
          onChange={checkCategory}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Salud y bienestar</span>
      </div>

      </section>




      
      <section className={styles.selects} onChange={(e) => handleOrder(e)}>
        <p className={styles.filterTitle}>Ordenar por</p>
        <select name="" id="" className={styles.select}>
          <option disabled selected>
            Precio
          </option>
          <option value="ASC">Menor a mayor</option>
          <option value="DESC">Mayor a menor</option>
        </select>
      </section>
      <button onClick={handleRemove}>Limpiar filtros</button>
    </div>
  );
};

export default ShopFilters;