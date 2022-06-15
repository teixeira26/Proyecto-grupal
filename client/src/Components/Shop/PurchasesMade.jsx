import { getOwners } from "../../redux/actions/ownProvActions";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { useEffect } from "react";
import EachPurchase from "./EachPurchase";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function PurchasesMade() {

  const { user } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOwners())
  }, [dispatch]);

  const users = useSelector((state) => state.owners);

  let userDB = users.find(us => us.email === user.email);

  console.log(userDB)
  function goToShop() {
    navigate('/shop')
  }

  return (
    <>
      <NavBar />
      <div>
        {userDB?.solds.length ? userDB?.solds.map(s => {
          return <EachPurchase id={s.id}
            state={s.status}
            date={s.date_created}
            price={s.transaction_amount}
            items={s.items} />
        })
          :
          <div>
            <h2>AÚN NO REALIZASTE COMPRAS</h2>
          </div>}
      </div>
      <button onClick={goToShop}>¡IR AL YUMPAWI-SHOP!</button>
      <br />
      <Footer />
    </>
  )
}