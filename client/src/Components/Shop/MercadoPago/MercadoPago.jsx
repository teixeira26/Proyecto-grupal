import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchCToken } from "./fetchmetod.js";

const FORM_ID = "payment-form";

export default function MercadoPago({ cart }) {
  
  const getPreference = useCallback(async () => {
    const res = await fetchCToken(`products/checkout`, { cart }, "POST");
    console.log('res MP', res);

    if(res.global){
    
      const script = document.createElement("script");
      console.log(script)
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", res.global);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    
      }
    
  }, []);

  useEffect(() => {
    getPreference();
  }, [getPreference]);
  
  return(
      <form id={FORM_ID} method="GET" />
  )
}







// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";

// const FORM_ID = 'payment-form';

// export default function Product() {
//   const { id } = useParams(); // id de producto
//   const [preferenceId, setPreferenceId] = useState(null);

//   useEffect(() => {
//     // luego de montarse el componente, le pedimos al backend el preferenceId
//     axios.post(`/products/${id}`, { productId: id }).then((order) => {
//         console.log('hola', order)
//       setPreferenceId(order.preferenceId);
//     });
//   }, [id]);

//   useEffect(() => {
//     if (preferenceId) {
//       // con el preferenceId en mano, inyectamos el script de mercadoPago
//       const script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.src =
//         'https://www.mercadopago.cl/integrations/v1/web-payment-checkout.js';
//       script.setAttribute('data-preference-id', preferenceId);
//       const form = document.getElementById(FORM_ID);
//       form.appendChild(script);
//     }
//   }, [preferenceId]);

//   return (
//     <form id={FORM_ID} method="GET" />
//   );
// }