import { useSelector } from "react-redux";
import styles from './PurchaseDetail.module.css'

export default function PurchaseDetail({ name, quantity, price, image }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={styles.container}>
      <img src={image} alt="Pet App" width="100" height="100" />
      <h3>Producto: {name}</h3>
      <h4>Cantidad: {quantity}</h4>
      <h4>Total: {price * quantity}</h4>
    </div>
  );
}
