import { getOwners } from "../../redux/actions/ownProvActions";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import EachPurchase from "./EachPurchase";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./PurchasesMade.module.css";
import InContainer from "../GlobalCss/InContainer.module.css";

export default function PurchasesMade() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwners());
  }, [dispatch]);

  const users = useSelector((state) => state.owners);
  let userDB = users.find((us) => us.email === user.email);

  console.log(userDB);
  function goToShop() {
    navigate("/shop");
  }

  return (
    <>
      <NavBar />
      <div className={InContainer.container}>
      <NavLink to="/mi-perfil">
          <img
            src="/assets/img/arrow-left.svg"
            alt=""
            className={style.leftArrow}
          />
        </NavLink>
        <div className={style.container}>
          {userDB?.solds.length ? (
            userDB?.solds.map((s) => {
              return (
                <EachPurchase
                  id={s.id}
                  state={s.status}
                  date={s.date_created}
                  price={s.transaction_amount}
                  items={s.items}
                />
              );
            })
          ) : (
            <div>
              <h2>Todavía no hiciste ninguna compra</h2>
            </div>
          )}
        </div>
        <div className={style.shop}>
        <button className="secondaryButton" onClick={goToShop}>
          ¡Ir al Petshop!
        </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
