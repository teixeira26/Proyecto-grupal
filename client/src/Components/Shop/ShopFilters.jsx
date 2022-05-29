import React, { useEffect} from "react";
import styles from "./ShopFilters.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { filterByPet } from "../../redux/actions/petshopActions";



const ShopFilters = () => {

  const dispatch = useDispatch();
  const filteredProducts = useSelector(state => state.filteredProducts)


  let select = []
  function checkPet(e){

    let selection = e.target.value
    let alredy = select.includes(selection)

    console.log('alredy', alredy)

    if(!alredy) select.push(e.target.value)
    if(alredy){
      select = select.filter(el => el !== selection )
    }

    dispatch(filterByPet([select]))
    
  }
  
  // useEffect(() =>{

  // }, [dispatch])



  return (
    <div className={styles.container}>

      <section className={styles.selects}>
        <p className={styles.filterTitle}>Filtrar por</p>
        <div className={styles.checkbox}>
          <input type="checkbox" value='perro' onChange={checkPet} className={styles.inputCheck} />
          <span className={styles.checkTitle}>Perro</span>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" value='gato' onChange={checkPet} className={styles.inputCheck} />
          <span className={styles.checkTitle}>Gato</span>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" value='conejo' onChange={checkPet} className={styles.inputCheck} />
          <span className={styles.checkTitle}>Conejo</span>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" value='tortuga' onChange={checkPet} className={styles.inputCheck} />
          <span className={styles.checkTitle}>Tortuga</span>
        </div>

      </section>


      <section className={styles.selects}>
        <select name="" id="" className={styles.select}>
          <option disabled selected>
            Categoría
          </option>
          <option value="alimento">Alimento</option>
          <option value="accesorios">Accesorios</option>
          <option value="salud y bienestar">Salud Y Bienestar</option>
        </select>
      </section>

      
      <section className={styles.selects}>
        <p className={styles.filterTitle}>Ordenar por</p>
        <select name="" id="" className={styles.select}>
          <option disabled selected>
            Precio
          </option>
          <option value="ASC">Ascendente</option>
          <option value="DESC">Descendente</option>
        </select>
      </section>




    </div>
  );
};

export default ShopFilters;
