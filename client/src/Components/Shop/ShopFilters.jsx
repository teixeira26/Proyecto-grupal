import React from "react";
import { useDispatch } from "react-redux";
import { getProducts, sortByPrice, filterByCategory, filterTargetAnimal } from "../../redux/actions/petshopActions";
import styles from "./ShopFilters.module.css";
import { useState } from "react";

const ShopFilters = () => {
  let dispatch = useDispatch();

  let [select, setSelect] = useState([]);
  let [petValue, setPetValue] = useState('todos');
  let [priceValue, setPriceValue] = useState('precio');

  function handleFilterTargetAnimal(e) {
    console.log(e.target.value);
    dispatch(filterTargetAnimal(e.target.value));
    setPetValue(e.target.value);
  };

  function handleOrder(e) {
    console.log(e.target.value);
    dispatch(sortByPrice(e.target.value));
    setPriceValue(e.target.value);
  };

  function handleRemove(e) {
    e.preventDefault();
    dispatch(getProducts());
    setPetValue('todos');
    setPriceValue('precio');
    dispatch(filterByCategory([]));
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
        <p className={styles.filterTitle}>Filtrar por Mascota</p>
        <select name="" id="" className={styles.select} value={petValue} onChange={handleFilterTargetAnimal}>
          <option value="todos" disabled selected>Tipo de Mascota</option>
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
        <select name="" id="" className={styles.select} value={priceValue}>
          <option value='precio' disabled selected>
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