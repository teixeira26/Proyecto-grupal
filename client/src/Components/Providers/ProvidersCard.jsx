import styles from "../Providers/ProvidersCard.module.css";
import { Link } from "react-router-dom";

export default function ProvidersCard({
  name,
  lastName,
  email,
  profilePicture,
  price,
  service,
  stars,
}) {
  return (
    <div className={styles.container}>
      <Link to={`/providers/${email}`}>
        <div className={styles.card}>
          <div className={styles.cardInfo}>
            {stars !== 0 && (
              <div className={styles.stars}>
                <p className={styles.star}>{stars >= 1 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 2 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 3 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 4 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars === 5 ? "★" : "☆"}</p>
              </div>
            )}
            {stars === 0 && (
              <div className={styles.stars}>
                <p className={styles.star}>{stars >= 1 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 2 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 3 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars >= 4 ? "★" : "☆"}</p>
                <p className={styles.star}>{stars === 5 ? "★" : "☆"}</p>
              </div>
            )}
            <img src={profilePicture} alt="" className={styles.cardImg} />

            <div className={styles.cardBottom}>
              <p className={styles.price}>${price}</p>
              <h2 className={styles.cardTitle}>
                {name} {lastName}
              </h2>
              {/* <h4 className={styles.service}>{service}</h4> */}
            </div>
          </div>
          <div className={styles.buttonDiv}>
          <Link to={`/providers/${email}`}>
            <button className='secondaryButton'>Ver detalle</button>
          </Link>
        </div>
        </div>
      </Link>
    </div>
  );
}
