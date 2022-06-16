import React from 'react';
import styles from "./NoResultsShop.module.css"

export default function NoFavs() {
    return(
        <div className={styles.container}>
            <img src="../assets/img/not-registered.png" alt="" className={styles.img}/>
            <h1 className={styles.h1}>¡Todavia no agregaste favoritos!</h1>
            {/* <p>Te recomendamos utilizar otros filtros para encontrar algo más acorde a lo que necesites.</p> */}
        </div>
    )
}