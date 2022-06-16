import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import inContainer from "../GlobalCss/InContainer.module.css";
import { useState } from "react";

import NavBar from "../NavBar/NavBarShop";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { getEvents, getPets, groupEvents } from "../../redux/actions/ownProvActions";
import MercadoPagoProviders from "./MercadoPago/MercadoPagoProviders";

export default function CheckoutBooking() {
  const { user } = useAuth0();
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(getEvents())
  }, [dispatch])

  let events = useSelector(state => state.events)
  console.log('events', events)

  let agrupacion = []
  while(events.length > 0){
  let newArray = events.filter(x =>{
      if(x.numberOfBooking === events[0].numberOfBooking){     
  return x 
      }
  })
  agrupacion.push(newArray)
  let newEvents = events.filter(el => el.numberOfBooking !== events[0].numberOfBooking)        
  events = newEvents
      }

  let userEvents = agrupacion.filter(ev => ev[0].ownerEmail === user.email)
  console.log('userEvents', userEvents)

  

  console.log('agrupacion', agrupacion)
    
  return (
    <>
      <NavBar />
      <div className={inContainer.container}>
        <section>
          <h2>RESERVAS AGENDADAS</h2>
            <br />
          { userEvents && userEvents.length ?
            userEvents.map(el =>{
            
              return el[0].payment=== 'pending'?(
              <div>
              <h5>Día del evento: {el[0].date.day}</h5>
              <h4>Fecha del evento: {el[0].date.realDate}</h4>
              <p>Nombre del Yump: {el[0].providerName}</p>
              <p>{el[0].date.hour}</p>
              <p>{el[0].eventType}</p>
              <p>Mascota: {el[0].petName}</p>
              <div>
              <MercadoPagoProviders id={el[0].id}
                                    eventType={el[0].eventType}
                                    price={el[0].price * el.length}/>
              </div>
            </div>):null

            }) :null
          }

        </section>
      </div>
    </>
  );
}
