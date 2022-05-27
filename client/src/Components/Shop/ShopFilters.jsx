import React from "react";
import styles from "./ShopFilters.module.css";

const ShopFilters = () => {
  return (
    <div className={styles.container}>
      <section className={styles.selects}>
        <p>Filtro por</p>
        <select name="" id="">
          <option disabled selected>
            Seleccionar
          </option>
          <option value="">Tipo animal</option>
          <option value="">Tipo producto</option>
        </select>
      </section>

      <section className={styles.selects}>
        <p>Ordenar por</p>
        <select name="" id="">
          <option disabled selected>
            Seleccionar
          </option>
          <option value="">Precio</option>
          <option value="">A-Z</option>
        </select>
      </section>
    </div>
  );
};

export default ShopFilters;
