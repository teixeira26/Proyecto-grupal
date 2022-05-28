import React from "react";
import styles from "./ShopFilters.module.css";

const ShopFilters = () => {
  return (
    <div className={styles.container}>
      <section className={styles.selects}>
        <p className={styles.filterTitle}>Buscar producto</p>
        <input
          type="text"
          placeholder="Nombre producto..."
          className={styles.search}
        />
      </section>

      <section className={styles.selects}>
        <p className={styles.filterTitle}>Filtrar por</p>
        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.inputCheck} />
          <span className={styles.checkTitle}>Perro</span>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.inputCheck} />
          <span className={styles.checkTitle}>Gato</span>
        </div>

        <div className={styles.checkbox}>
          <input type="checkbox" className={styles.inputCheck} />
          <span className={styles.checkTitle}>Todos</span>
        </div>
      </section>

      <section className={styles.selects}>
        <p className={styles.filterTitle}>Ordenar por</p>
        <select name="" id="" className={styles.select}>
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
