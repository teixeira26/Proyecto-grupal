import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  chargeCart,
  clearAllCart,
  postSold,
} from "../../../redux/actions/petshopActions";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Confirmación.module.css";

const Confirmación = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const { user } = useAuth0();
  const dispatch = useDispatch();

  const [compraExitosa, setCompraExitosa] = useState("esperando");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let payment_id = query.get("payment_id");
  let collection_id = query.get("collection_id");
  console.log("COLLECIOOOOOOOOOOOOOOOOON", collection_id);
  let status = query.get("status");
  const idCliente = localStorage.getItem("IdCliente");

  useEffect(() => {
    dispatch(chargeCart(user.email));
  }, [dispatch]);

  const clearCart = () => {
    dispatch(clearAllCart(user.email));
  };

  let neto = () => {
    cart.forEach((i) => {
      let total = i.stock - i.quantity;
      return axios.put(`http://localhost:3001/products/${i.id}`, {
        stock: total,
      });
    });
  };

  // http://localhost:3000/confirmacion?collection_id=22853430296&collection_status=approved&payment_id=22853430296&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4886373922&preference_id=1134140317-628056cc-5b68-4165-bc81-4131a793f9b1&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

  useEffect(() => {
    (async () => {
      if (payment_id !== null && status === "approved") {
        setCompraExitosa("comprado");

        let res = await axios.get(
          `https://api.mercadopago.com/v1/payments/${collection_id}?access_token=APP_USR-2420739168238379-060913-b26faddf6d640dd5510456dca90bd65c-1139786546`
        );
 
        console.log('REEEESSS', res.data)
        let resp = {
          id: res.data.id,
          first_name: user.given_name,
          last_name: user.family_name,
          items: res.data.additional_info.items,
          status: res.data.status,
          date_created: res.data.date_created,
          transaction_amount: res.data.transaction_amount,
          email: user.email
         }

         console.log('REEEESSSpp', resp)


        dispatch(postSold(resp))
       
        setTimeout(() => {
          clearCart();
        }, 3000);

        setTimeout(() => {
          navigate("/shop");
        }, 4000);
      }
    })();
  }, [payment_id, status, idCliente, navigate, clearCart, user]);

  return (
    <>
      <div className={style.container}>
        <p className={style.paragraph}>Esperando confirmación de compra:</p>
        <h2 className={style.confirm}>CONFIRMACIÓN DEL PEDIDO</h2>

        {compraExitosa === "esperando" && <h3>Procesando...</h3>}
        {compraExitosa === "comprado" && <h3>Gracias por comprar</h3>}
        {compraExitosa === "error" && <h3>Error en la compra</h3>}
        {neto()}

        <h3 className={style.redi}>Serás redirigido en unos segundos</h3>
      </div>
    </>
  );
};

export default Confirmación;
