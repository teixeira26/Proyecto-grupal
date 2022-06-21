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
import style from "../../Shop/MercadoPago/Confirmación.module.css";
import { getEvents, putEvent } from "../../../redux/actions/ownProvActions";

const Confirmation = () => {
  const navigate = useNavigate();

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
  const eventID = useSelector(state => state.selectedEvent)

  useEffect(() => {
    console.log("EVENT ID", eventID)
  }, [eventID])

  // http://localhost:3000/confirmacion?collection_id=22853430296&collection_status=approved&payment_id=22853430296&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4886373922&preference_id=1134140317-628056cc-5b68-4165-bc81-4131a793f9b1&site_id=MLA&processing_mode=aggregator&merchant_account_id=null

  useEffect(() => {
    (async () => {
      if (payment_id !== null && status === "approved") {
        setCompraExitosa("comprado");

        let res = await axios.get(
          `https://api.mercadopago.com/v1/payments/${collection_id}?access_token=APP_USR-7012537343723443-053123-5facd15f88649bf31385f5ab06f47cb9-1134140317`
        );

        console.log("REEEESSS", res.data);
        let resp = {
          idMP: res.data.id,
          payment: res.data.status,
          date_created: res.data.date_created,
        };

        console.log("REEEESSSpp", resp);

        dispatch(putEvent(localStorage.getItem("id"), resp));  

        setTimeout(() => {
          navigate("/mi-perfil");
        }, 4000);
      }
    })();
  }, [payment_id, navigate, user, dispatch, status]);

 
  

  return (
    <>
      <div className={style.container}>
        <p className={style.paragraph}>Esperando confirmación de compra:</p>
        <h2 className={style.confirm}>CONFIRMACIÓN DEL PEDIDO</h2>

        {compraExitosa === "esperando" && <h3>Procesando...</h3>}
        {compraExitosa === "comprado" && <h3>Gracias por comprar</h3>}
        {compraExitosa === "error" && <h3>Error en la compra</h3>}

        <h3 className={style.redi}>Serás redirigido en unos segundos</h3>
      </div>
    </>
  );
};

export default Confirmation;
