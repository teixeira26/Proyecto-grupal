import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProducts,
  sortByPrice,
  filterByCategory,
  filterTargetAnimal,
  searchBarProducts
} from "../../redux/actions/petshopActions";
import styles from "./ShopFilters.module.css";

const ShopFilters = () => {
  let dispatch = useDispatch();

  const [inputSearchBar, setInputSearchBar] = useState('');
  let [select, setSelect] = useState([]);
  let [petValue, setPetValue] = useState('todos');
  let [priceValue, setPriceValue] = useState('precio');
  let [checkedOne, setCheckedOne] = useState(false);
  let [checkedTwo, setCheckedTwo] = useState(false);
  let [checkedThree, setCheckedThree] = useState(false);

  useEffect(()=> {
    dispatch(getProducts());
  }, [])
  // Hook search bar
  useEffect(() => {
    dispatch(searchBarProducts(inputSearchBar))
  }, [dispatch, inputSearchBar]);

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch]);


  ///////////////////////////////////////////////
  // Handles search bar
  ///////////////////////////////////////////////
  function onInputChangeSearchbar(e) {
    e.preventDefault();
    setInputSearchBar(e.target.value)
  };
  /////////////////////////////////////////////// 

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
    setInputSearchBar('');
    setPetValue('todos');
    setPriceValue('precio');
    setSelect([]);
    setCheckedOne(false);
    setCheckedTwo(false);
    setCheckedThree(false);
  };

  function checkCategoryOne(e) {
    let selection = e.target.value;
    let already = select.includes(selection);
    console.log("already", already);

    if (!already) {
      setCheckedOne(!already);
      setSelect(select = [...select, e.target.value]);
      console.log('select:::', select)

    }
    if (already) {
      setCheckedOne(already);
      let aux = select.filter((el) => el !== selection);
      setSelect(select = aux);
      console.log('aux:::', aux)
    }
    dispatch(filterByCategory(select));
  }

  function checkCategoryTwo(e) {
    let selection = e.target.value;
    let already = select.includes(selection);
    console.log("already", already);

    if (!already) {
      setCheckedTwo(!already);
      setSelect(select = [...select, e.target.value]);
      console.log('select:::', select)
    }
    if (already) {
      setCheckedTwo(already);
      let aux = select.filter((el) => el !== selection);
      setSelect(select = aux);
      console.log('aux:::', aux)
    }
    dispatch(filterByCategory(select));
  }

  function checkCategoryThree(e) {
    let selection = e.target.value;
    let already = select.includes(selection);
    console.log("already", already);

    if (!already) {
      setCheckedThree(!already);
      setSelect(select = [...select, e.target.value]);
      console.log('select:::', select)
    }
    if (already) {
      setCheckedThree(already);
      let aux = select.filter((el) => el !== selection);
      setSelect(select = aux);
      console.log('aux:::', aux)
    }
    dispatch(filterByCategory(select));
  }

  return (
    <div className={styles.container}>

      {/* Bloque seach bar*/}
      <div className={styles.container}>
        <section className={styles.selects} >
          <p className={styles.filterTitle}>Buscar producto</p>
          <input
            type="text"
            value={inputSearchBar}
            placeholder="Ingresa tu búsqueda..."
            className={styles.search}
            onChange={onInputChangeSearchbar}
          />
        </section>
      </div>

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
            onChange={checkCategoryOne}
            className={styles.inputCheck}
            checked={checkedOne}
          />
          <span className={styles.checkTitle}>Alimento</span>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            value="accesorios"
            onChange={checkCategoryTwo}
            className={styles.inputCheck}
            checked={checkedTwo}
          />
          <span className={styles.checkTitle}>Accesorios</span>
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            value="salud y bienestar"
            onChange={checkCategoryThree}
            className={styles.inputCheck}
            checked={checkedThree}
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
      <button className="secondaryButton" onClick={handleRemove}>Limpiar filtros</button>
    </div>
  );
};

export default ShopFilters;