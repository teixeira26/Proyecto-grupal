import { useDispatch, useSelector } from "react-redux"
import { getOwnerById, getProviderById, getEvents } from "../../redux/actions/ownProvActions"
import { useEffect } from "react"
import NavBar from "../NavBar/NavBarShop"
import Footer from "../Footer/Footer"
import { useAuth0 } from "@auth0/auth0-react";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom"



export default function OfferedServicesDetail (){



const { user } = useAuth0();
  const dispatch = useDispatch();
  const idUser = localStorage.getItem("idUser")
  const navigate = useNavigate()


  useEffect(()=>{
    dispatch(getEvents())
    dispatch(getOwnerById(idUser))
}, [dispatch])

  let events = useSelector(state => state.events)
  const owner = useSelector(state => state.owners)

  console.log('owner', owner)

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

  let userEvents = agrupacion.filter(ev => ev[0].ownerEmail === owner[0].email)
  console.log('userEvents', userEvents)


  const columns = [
    { field: "id", headerName: "ID", minWidth: 35 },
    { field: "email", headerName: "Usuario", minWidth: 175 },
    { field: "proveider", headerName: "Proveedor", minWidth: 175 },
    { field: "eventType", headerName: "Event Type", minWidth: 150 },
    { field: "petName", headerName: "Pet Name", minWidth: 150 },
    { field: "servicePrice", headerName: "Service Price", minWidth: 150 },
    { field: "paymentStatus", headerName: "Payment Status", minWidth: 150 },
    { field: "idPayment", headerName: "Payment ID", minWidth: 150 },
]


    const rows = userEvents.map((ev) => {

        return {
          id: ev[0].numberOfBooking,
          email: ev[0].ownerEmail,
          proveider: ev[0].providerEmail,
          eventType: ev[0].eventType,
          petName: ev[0].petName,
          servicePrice: ev[0].price*ev.length,
          paymentStatus: ev[ev.length-1].payment,
          idPayment: ev[ev.length-1].idMP? ev[ev.length-1].idMP : 'pending' ,}})

          function back(){
            navigate('/admin/get-users')
          }
        
    
    return(
        <>
        <NavBar />
        <Table stickyHeader aria-label="sticky table">
          <TableRow stickyHeader aria-label="sticky table">
            <TableCell align="center" colSpan={7}>
              SERVICIOS CONTRATADOS
            </TableCell>
          </TableRow>
        </Table>
  
        <div style={{ height: 375, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
        <Button onClick={back}>REGRESAR</Button>
  
        <Footer />
      </>

    )

}