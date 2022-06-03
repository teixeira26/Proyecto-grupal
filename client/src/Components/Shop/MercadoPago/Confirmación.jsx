import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
// import { carritoTraerUno } from '../../../controllers/Carrito'
import { useDispatch, useSelector } from 'react-redux';
import { clearAllCart, getProducts } from '../../../redux/actions/petshopActions';
import { useAuth0 } from '@auth0/auth0-react';



const Confirmación = () =>{
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.products)
    const { user } = useAuth0()
    const dispatch = useDispatch()

    const [compraExitosa, setCompraExitosa] = useState('esperando')
    const useQuery = () =>{
        return new URLSearchParams(useLocation().search)
    };
    let query = useQuery();
    let payment_id = query.get('payment_id')
    let status = query.get('status')
    const idCliente = localStorage.getItem('IdCliente')


    const clearCart = () => {
        dispatch(clearAllCart(user.email));
        // setTotal(0);
    }

    // useEffect(()=>{
    //     dispatch(getProducts())
    //     (() => {
    //         for (let i = 0; i < products.length; i++){
    //             for(let j = 0; j < cart.length; j++){
    //                 if(products[i].id === cart[j].id){
    //                     return products[i].stock - cart[j].quantity
    //                 }
    //             }
    //         }})()
        


    // }, [dispatch])


    http://localhost:3000/confirmacion?collection_id=22853430296&collection_status=approved&payment_id=22853430296&status=approved&external_reference=null&payment_type=credit_card&merchant_order_id=4886373922&preference_id=1134140317-628056cc-5b68-4165-bc81-4131a793f9b1&site_id=MLA&processing_mode=aggregator&merchant_account_id=null


    console.log('PRODUCTOS', products)



    useEffect(()=>{
        (async () =>{
            if(payment_id !== null && status === 'approved'){
                // const carritoDB = await carritoTraerUno(idCliente)
                // const pedido = {
                //     payment_id: payment_id,
                //     status: status,
                //     // carritoDB: carritoDB
                // };
                // const request = await axios({
                //     method: 'post',
                //     baseURL: 'http://localhost:3001/products/checkout',
                //     data: JSON.stringify(pedido),
                //     headers:{
                //         "Content-Type": 'application/json',
                //         'Access-Control-Allow-Origin': '*',
                //     },
                //     withCredentials: true
                // });

                // if(request.data){

                

                    // neto()
                    clearCart()
                    setCompraExitosa('comprado')
                    setTimeout(()=>{
                        navigate('/shop')
                    }, 4000)
                // }else{
                //     console.log('No se pudo comprar')
                //     setCompraExitosa('error')
                // }
            }
        })();
    }, [payment_id, status, idCliente, navigate, products]);

    return (
        <>
            <div>
                <h2>CONFIRMACIÓN DEL PEDIDO</h2>
                <p>Esperando confirmación de compra:</p>
                {compraExitosa === 'esperando' && <h3>Procesando...</h3>}
                {compraExitosa === 'comprado' && <h3>Gracias por comprar</h3>}
                {compraExitosa === 'error' && <h3>Error en la compra</h3>}
            </div> 
        </>
    );
};

export default Confirmación