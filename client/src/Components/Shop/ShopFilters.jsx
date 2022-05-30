import React from "react";
import styles from "./ShopFilters.module.css";
import { filterByPet, getProducts, sortByPrice, filterByCategory,filterTargetAnimal } from "../../redux/actions/petshopActions";
import { useDispatch } from "react-redux";

const ShopFilters = () => {

    let dispatch = useDispatch();


    function handleFilterTargetAnimal(e) {
        console.log(e.target.value);
        dispatch(filterTargetAnimal(e.target.value))
      }

      function handleFilterCategory(e) {
        console.log(e.target.value);
        dispatch(filterByCategory(e.target.value))
      }

    
      function handleOrder(e) {
          console.log(e.target.value)
          dispatch(sortByPrice(e.target.value))
      }
    
      function handleRemove(e) {
        e.preventDefault();
        dispatch(getProducts())
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
    
    
    
  return (
    <div className={styles.container}>
    {/* <section className={styles.selects}>
      <p className={styles.filterTitle}>Filtrar por</p>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="perro"
          onChange={checkPet}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Perro</span>
      </div>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="gato"
          onChange={checkPet}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Gato</span>
      </div>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="conejo"
          onChange={checkPet}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Conejo</span>
      </div>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value="tortuga"
          onChange={checkPet}
          className={styles.inputCheck}
        />
        <span className={styles.checkTitle}>Tortuga</span>
      </div>
    </section> */}
        <br/>

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
      </select>
    </section>


    <section className={styles.selects}>
      <select name="" id="" className={styles.select} onChange={handleFilterCategory}>
        <option disabled selected>
          Categoría
        </option>
        <option value="alimento">Alimento</option>
        <option value="accesorios">Accesorios</option>
        <option value="salud y bienestar">Salud Y Bienestar</option>
      </select>
    </section>

    <section className={styles.selects} onChange={(e)=>handleOrder(e)}>
      <p className={styles.filterTitle}>Ordenar por</p>

      <select name="" id="" className={styles.select}>
        <option disabled selected>
          Precio
        </option>
        <option value="ASC">Ascendente</option>
        <option value="DESC">Descendente</option>
      </select>
    </section>

    <button onClick={handleRemove}>Remover filtros</button>

  </div>


);
};

export default ShopFilters;
