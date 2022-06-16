import style from "./EachPurchase.module.css";
import { NavLink } from "react-router-dom";

export default function EachPurchase({ id, state, date, price, items }) {
  return (
    <div>
        
      <div className={style.borde}>
        <h3 className={style.title}>Comprobante #{id}</h3>
        <h4 className={style.state}>
          {" "}
          <span className={style.stateTit}>Estado</span> {state}
        </h4>
        <h4 className={style.date}>Fecha de la compra: {date.slice(0, 10)}</h4>

        {items.map((i) => {
          return (
            <div>
              <h5>Productos comprados: {i.quantity}</h5>
            </div>
          );
        })}
        <h4>Total: ${price}</h4>
      </div>
    </div>
  );
}
