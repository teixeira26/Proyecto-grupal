import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "../../index.css";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { chargeCart, clearAllCart } from "../../redux/actions/petshopActions";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";
import MercadoPago from "../Shop/MercadoPago/MercadoPago";
import styles from "../ShoppingCart/ShoppingCart.module.css";
import InContainer from "../GlobalCss/InContainer.module.css";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const cart = useSelector((state) => state.cart);
  console.log("CARRITO: ", cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user) {
      dispatch(chargeCart(user.email));
    }
  }, [user, dispatch]);

  useEffect(() => {
    var suma = 0;
    if (cart && cart.length) {
      cart.forEach((x) => {
        suma += x.price * x.quantity;
        console.log("TOTAL", total);
      });
      setTotal(suma);
    } else {
      setTotal(0);
    }
  }, [cart]);

  const clearCart = () => {
    dispatch(clearAllCart(user.email));
    setTotal(0);
  };

  return (
    <div>
      <NavBarShop />
      <div className={InContainer.container}>
        <NavLink to="/shop">
          <img src="./assets/img/arrow-left.svg" alt="" />
        </NavLink>

        <h2 className={styles.cartTitle}>Carrito</h2>

        <h3 className={styles.cartProducts}>Productos a comprar</h3>

        <div className={styles.cartSubtitles}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  <p>Imagen</p>
                </th>
                <th className={styles.th}>
                  <p className={styles.product}>Producto</p>
                </th>
                <th className={styles.th}>
                  <p className={styles.price}>Precio</p>
                </th>
                <th className={styles.th}>
                  <p className={styles.price}>Cantidad</p>
                </th>
                <th className={styles.th}>
                  <p className={styles.price}>Subtotal</p>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <article className={styles.productList}>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <CartItem
                key={index}
                name={item.name}
                image={item.profilePicture}
                price={item.price}
                quantity={item.quantity}
                id={item.id}
                stock={item.stock}
              />
            ))
          ) : (
            <p className={styles.noProducts}>
              No hay ningún producto en el carrito
            </p>
          )}
        </article>

        <div className={styles.cartBottom}>
          <div>
            <div className={styles.totalFlex}>
              <h3>Total: ${total}</h3>
            </div>

            <div className={styles.purchase}>
              {cart && cart.length > 0 ? (
                <Link to="/purchaseConfirmation">
                  <button>Continuar al pago</button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          {cart && cart.length > 0 ? (
            <article>
              <button onClick={clearCart}>Limpiar Carrito</button>
            </article>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default ShoppingCart;
