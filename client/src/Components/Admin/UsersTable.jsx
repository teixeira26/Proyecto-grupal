import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getOwners, getProviders, putOwnerInfo, getReviews } from "../../redux/actions/ownProvActions";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate, Link } from "react-router-dom";
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
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getProviders());
    dispatch(getOwners())
    dispatch(getReviews())
  }, [dispatch, ]);

  useEffect(() => {
  }, [users, reviews]);

  const providers = useSelector((state) => state.providers);

  function hired(id) {
    localStorage.setItem("idUser", id)
    navigate(`/admin/servicios-contratados/`)
  }

  function offer(id) {
    localStorage.setItem("idUser", id)
    navigate(`/admin/prestacion-servicios/`)
  }




  function ban(useremail) {
    Swal.fire({
      title: '¿Estas seguro que querés inactivar al usuario? Esto le impedirá acceder a la plataforma y a toda la información relacionada con la misma.',
      showDenyButton: true,
      denyButtonText: `Descartar`,
      confirmButtonText: 'Inactivar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('El usuario fue inactivado con éxito', '', 'success')
        dispatch(putOwnerInfo(useremail,{isBanned: true}))
        dispatch(getOwners())
      } else if (result.isDenied) {
        Swal.fire('El usuario seguirá activo.', '', 'info')
      }
    })
  }

  function unBan(useremail) {
    Swal.fire({
      title: '¿Estás seguro que querés habilitar al usuario? Esto le dará acceso a la plataforma y a toda la información relacionada con la misma.',
      showDenyButton: true,
      denyButtonText: `Descartar`,
      confirmButtonText: 'Habilitar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire('El usuario fue habilitado con éxito', '', 'success')
        dispatch(putOwnerInfo(useremail,{isBanned: false}))
        dispatch(getOwners())
      } else if (result.isDenied) {
        Swal.fire('El usuario seguirá inactivo.', '', 'info')
      }
    })
  }

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200 },
    { field: "name", headerName: "Nombre", minWidth: 150 },
    { field: "lastName", headerName: "Apellido", minWidth: 150 },
    // { field: "service", headerName: "Ofrece Servicio", minWidth: 150 },
    { field: "raiting", 
      renderCell:(cellValues) =>{
        let rev = reviews?.find((el) => el.providerEmail === cellValues.id)       
       if (rev) 
        return <div style={{display:'inline'}}>
        <p className={style.star}>{rev.review>=1?'★':'☆'}</p>
        <p className={style.star}>{rev.review>=2?'★':'☆'}</p>
        <p className={style.star}>{rev.review>=3?'★':'☆'}</p>
        <p className={style.star}>{rev.review>=4?'★':'☆'}</p>
        <p className={style.star}>{rev.review===5?'★':'☆'}</p> 
        </div> 
        
        else return null      
      }, minWidth: 130 
    },
{ field: '', headerName: '', maxWidth: 80 },

    // { field: "state", headerName: "Estado", minWidth: 150 },
    {
      field: 'Servicios contratados',
      renderCell: (cellValues) => {
        return <Button onClick={() => hired(cellValues.id)}>VER</Button>;
      }, minWidth: 150
    },
    {
      field: 'Servicios ofrecidos',
      renderCell: (cellValues) => {
        return <Button onClick={() => offer(cellValues.id)}>VER</Button>;
      }, minWidth: 150
    },

    { field: "ban", headerName: "Baneado", minWidth: 150 },
    {
      field: ban, 
      renderCell: (cellValues) => {
        return cellValues.row.ban === 'BANEADO'?  
        <Button onClick={()=>unBan(cellValues.row.email)}>Habilitar</Button> :
        <Button onClick={()=>ban(cellValues.row.email)}>Inactivar</Button>;
      },
    },


  ];

  const rows = users.map((us) => {

    return {
      id: us.email,
      email: us.email,
      name: us.name,
      lastName: us.lastName,
      // service: providers.find((el) => el.email === us.email) ? "SÍ" : "NO",
      '': (() => {let rev = reviews?.find((el) => el.providerEmail === us.email )
                          return rev? rev.review : null })(),
      // state: us.isActive ? "ACTIVO" : "INACTIVO",
      ban: us.isBanned ? "BANEADO" : null,
    };
  });
  function back(){
    navigate('/admin/dashboard')
  }

  return (
    <>
      <NavBar />
      <Table stickyHeader aria-label="sticky table">
        <TableRow stickyHeader aria-label="sticky table">
          <TableCell align="center" colSpan={7}>
            Listado de yumpis registrados
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
      <Button onClick={back}>Volver</Button>
      <Footer />
    </>
  );
}
