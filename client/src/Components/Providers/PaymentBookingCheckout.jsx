import MercadoPagoProviders from "./MercadoPago/MercadoPagoProviders";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";


export default function PaymentBookingCheckout(){

    let service = localStorage.getItem('service')

    
    service = JSON.parse(service)
    console.log(service)

    return(
        <div>
            <NavBar />
            <h3>Realizá tu pago a continuación para dejar tu servicio yumPaw confirmado :D</h3>
         <MercadoPagoProviders id={service[0].id}
                              eventType={service[0].eventType}
                              price={service[0].price * service.length}/>
            <Footer /> 
        </div>

    )
}