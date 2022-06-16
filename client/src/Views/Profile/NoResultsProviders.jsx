import React from 'react';
import styles from "./NoResultsShop.module.css";

export default function NoResultsProviders() {
    return(
        <div className={styles.container}>
            <img src="../assets/img/not-registered.png" alt="" className={styles.img}/>
            <h1 className={styles.h1}>Actualmente no existen yumpis según tu búsqueda :(</h1>
        </div>
    )
}