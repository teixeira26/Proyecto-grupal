import { useSelector } from "react-redux";
import styles from "./PurchaseDetail.module.css";

export default function PurchaseDetail({ name, quantity, price, image }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={styles.container}>
      <div className={styles.productImg}>
        <h3 className={styles.product}><span className={styles.primary}>{quantity}</span>  x  <span className={styles.primary}>{name}</span></h3>
      </div>

      <h4 className={styles.subtotal}>Subtotal: ${price * quantity}</h4>
    </div>
  );
}
