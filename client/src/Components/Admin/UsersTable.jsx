import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getOwners, getProviders, putOwnerInfo, getReviews } from "../../redux/actions/ownProvActions";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import style from '../../Components/Providers/ProvidersCard.module.css';



export default function ProductsList() {
  const navigate = useNavigate();
  const { user } = useAuth0()

  const dispatch = useDispatch();
  const users = useSelector((state) => state.owners);
  const [stars, setStars] = useState(5)
  


  useEffect(() => {
    dispatch(getProviders());
    dispatch(getOwners())
    dispatch(getReviews())
    let myreviews = reviews.filter((x) => x.provider.email === user.email);

    if(myreviews.length) {
      myreviews= myreviews.map(x=> x.review) 
      let numberEvaluations = myreviews.length
      myreviews = myreviews.reduce((x,y)=>x+y, 0)
      setStars(myreviews/numberEvaluations)
      }

  }, [dispatch]);

  
  useEffect(() => {
   
  }, [users]);


  const reviews = useSelector((state) => state.reviews);
  console.log('reviews', reviews)

  const providers = useSelector((state) => state.providers);


  function ban() {
    Swal.fire({
      title: '¿Banear al usuario? Esto le impedirá el acceso a la plataforma y a toda la información que en ella se encuentra.',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Descartar`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('Usuario baneado', '', 'success')
        dispatch(putOwnerInfo(user.email,{isBanned: true}))
        dispatch(getOwners())
      } else if (result.isDenied) {
        Swal.fire('El usuario continúa ACTIVO', '', 'info')
      }
    })

  }

  function unBan() {
    Swal.fire({
      title: '¿Habilitar usuario? Esto le dará acceso a la plataforma y a toda la información que en ella se encuentra.',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Descartar`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('Usuario habiliado', '', 'success')
        dispatch(putOwnerInfo(user.email,{isBanned: false}))
        dispatch(getOwners())
      } else if (result.isDenied) {
        Swal.fire('El usuario continúa baneado', '', 'info')
      }
    })

  }


  const columns = [
    { field: "email", headerName: "Email", minWidth: 200 },
    { field: "name", headerName: "Nombre", minWidth: 150 },
    { field: "lastName", headerName: "Apellido", minWidth: 150 },
    { field: "service", headerName: "Ofrece Servicio", minWidth: 150 },
    { field: "raiting",       renderCell: () => {
      return <div style={{display:'inline'}}>
      <p className={style.star}>{stars>=1?'★':'☆'}</p>
      <p className={style.star}>{stars>=2?'★':'☆'}</p>
      <p className={style.star}>{stars>=3?'★':'☆'}</p>
      <p className={style.star}>{stars>=4?'★':'☆'}</p>
      <p className={style.star}>{stars===5?'★':'☆'}</p>
</div>
    }, minWidth: 200 ,
},
    { field: "state", headerName: "Estado", minWidth: 150 },
    { field: "ban", headerName: "Baneado", minWidth: 150 },

    {
      field: null, 
      renderCell: (cellValues) => {
        return cellValues.row.ban === 'BANEADO'?  
         <Button onClick={unBan}>HABILITAR</Button> :
         <Button onClick={ban}>BANEAR</Button>;
      },
    },
  ];

  const rows = users.map((us) => {
    return {
      id: us.email,

      email: us.email,
      name: us.name,
      lastName: us.lastName,
      service: providers.find((el) => el.email === us.email) ? "SÍ" : "NO",
      state: us.isActive ? "ACTIVO" : "INACTIVO",
      ban: us.isBanned ? "BANEADO" : null,
    };
  });

  return (
    <>
      <NavBar />
      <Table stickyHeader aria-label="sticky table">
        <TableRow stickyHeader aria-label="sticky table">
          <TableCell align="center" colSpan={7}>
            LISTADO DE YUMPAWIS REGISTRADOS
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
      <Footer />
    </>
  );
}
