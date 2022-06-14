import React, { useEffect, useSelector } from "react";
import { Link, useParams } from "react-router-dom";
import inContainer from "../GlobalCss/InContainer.module.css";
import { useState } from "react";

import NavBar from "../NavBar/NavBarShop";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getPets } from "../../redux/actions/ownProvActions";
import MercadoPagoProviders from "./MercadoPago/MercadoPagoProviders";

export default function CheckoutBooking() {
  const [eventsOwner, setEventsOwner] = useState();
  const [isProvider, setIsProvider] = useState(false);
  const [eventsProvider, setEventsProvider] = useState();
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("http://localhost:3001/providers?filter=&order=ASC")
        .then((x) => {
          const providerCheck = x.data.find((x) => x.email === user.email);
          if (providerCheck) {
            setIsProvider(true);
          }
        });
      axios
        .get("http://localhost:3001/owners")
        .then((x) => {
          const userdb = x.data.find((x) => x.email === user.email);
          console.log(userdb);
          console.log("userdb", userdb);
        })
        .then(() => {
          return axios.get("http://localhost:3001/events");
        })
        .then((x) => {
          setEventsOwner(x.data.filter((x) => x.ownerEmail === user.email));
          setEventsProvider(
            x.data.filter((x) => x.providerEmail === user.email)
          );
        });
    }
  }, [user, isAuthenticated, dispatch]);

  return (
    <>
      <NavBar />
      <div className={inContainer.container}>
        <section>
          <h2>RESERVAS AGENDADAS</h2>
          <h3>Pago pendiente</h3>
            <br />
          {eventsOwner && eventsOwner.length
            ? eventsOwner.map((x) => {
                console.log(x)
                return (
                  <div>
                    <h5>Día del evento: {x.date.day}</h5>
                    <h4>Fecha del evento: {x.date.realDate}</h4>
                    <p>Nombre del Yump: {x.providerName}</p>
                    <p>{x.date.hour}</p>
                    <p>{x.eventType}</p>
                    <p>Mascota: {x.petName}</p>
                    <MercadoPagoProviders id={x.id}
                                          eventType={x.eventType}
                                          price={x.price}/>
                  </div>
                );
              })
            : null}
        </section>
      </div>
    </>
  );
}
