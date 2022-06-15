import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOneItem,
  deleteItem,
  removeFromCart,
} from "../../redux/actions/petshopActions";
import styles from "../ShoppingCart/CartItem.module.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  ADD_ITEM,
  DELETE_ITEM,
} from "../../redux/actions-type/petshopActionsTypes";

const CartItem = ({ name, image, price, quantity, id, stock }) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.find((x) => x.id === id);

  const delFromCart = (id) => {
    dispatch(removeFromCart(id, user.email));
  };
  const addItem = () => {
    if(cartItem.stock > cartItem.quantity)
    {dispatch({
      type: ADD_ITEM,
      payload: id,
      email: user.email,
      stock: stock,
    });}
    else Swal.fire(`La cantidad deseada excede al limite en stock`);
  };

  const delItem = () => {
    dispatch({
      type: DELETE_ITEM,
      payload: id,
      email: user.email,
    });
  };

  console.log("quantity", quantity);

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th className={styles.th}>
                <Link to={`/shop/${id}`}>
                  <img src={image} alt="Pet App" width="100" height="100" />
                </Link>
              </th>

              <th className={styles.th}>
                <div className={styles.item}>
                  <h4 className={styles.productName}>{name}</h4>
                  <button
                    onClick={() => delFromCart(id)}
                    className={styles.buttonDelete}
                  >
                    Eliminar
                  </button>
                </div>
              </th>

              <th className={styles.th}>
                <h5 className={styles.price}>${price}.00</h5>
              </th>

              <th className={styles.th}>
                <div className={styles.centerButton}>
                  <div className={styles.addOneItem}>
                    <span className={styles.button} onClick={delItem}>
                      -
                    </span>

                    <div className={styles.count}>{quantity}</div>

                    <span className={styles.button} onClick={addItem}>
                      +
                    </span>
                  </div>
                </div>
              </th>

              <th className={styles.th}>
                <h5 className={styles.total}>${price * quantity}.00</h5>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default CartItem;
