import React from 'react'
import styles from "./Banned.module.css"

const Banned = () => {
  return (
    <div className={styles.container}>
        <img src="./assets/img/ban.png" alt="" />
        <h1 className={styles.title}>Lamentablemente has sido baneado :(</h1>
       
    </div>
  )
}

export default Banned