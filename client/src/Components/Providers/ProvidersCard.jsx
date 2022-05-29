import styles from '../Providers/ProvidersCard.module.css'

export default function ProvidersCard({name, lastName, profilePicture, price, service}){

    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <img src={profilePicture} alt="" className={styles.cardImg} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png" alt="" className={styles.addFav}/>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardTitle}>{name} {lastName}</h3>
              <div className={styles.cardBottom}>
                <p className={styles.price}>{price}</p>
                <p className={styles.price}>{service}</p>
                <button className={styles.addButton}>Detalle</button>
              </div>
            </div>
          </div>
        </div>
      );
}