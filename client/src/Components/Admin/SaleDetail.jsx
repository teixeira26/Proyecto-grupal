import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import { getSolds } from "../../redux/actions/ownProvActions";


export default function SaleDetail(){
  
  const dispatch = useDispatch()
  const id = useParams().id;
  const navigate = useNavigate()
 console.log(id)
  
  useEffect(()=>{
    dispatch(getSolds())
  },[dispatch])

    const sold = useSelector(state => state.solds)

    const selectedSold = sold.find(el => el.id === id)
        console.log('SOLD',sold)

    console.log('SELECTED SOLD', selectedSold)

    function goToList(){
      navigate('/admin/ventas-petshop')
    }

  return (  <>
  <NavBar />
   
  {
    
        selectedSold?
        <div>
        <h3>Comprobante #{sold[0].id}</h3>
        <h4>Estado {sold[0].status}</h4>
        <h4>Fecha de la compra {sold[0].date_created}</h4>
        <h4>Total: ${sold[0].transaction_amount}</h4>
        {sold[0].items.map(i => {
            return <div>
                <h5>x{i.quantity} </h5> <h5>{i.title}</h5>
                <h5>Precio unitario: {i.unit_price}</h5>
            </div>
          
        })}   </div>: null

    }


    <Button onClick={goToList}> VOLVER AL LISTADO </Button>
    
    <Footer />

  </>)

  
}