import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getOwners, getProviders } from "../../redux/actions/ownProvActions";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";

import TableRow from "@mui/material/TableRow";

export default function ProductsList() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwners());
    dispatch(getProviders());
  }, [dispatch]);

  const providers = useSelector((state) => state.providers);

  const users = useSelector((state) => state.owners);

  function ban() {}

  const columns = [
    { field: "email", headerName: "Email", minWidth: 200 },
    { field: "name", headerName: "Nombre", minWidth: 150 },
    { field: "lastName", headerName: "Apellido", minWidth: 150 },
    { field: "service", headerName: "Ofrece Servicio", minWidth: 150 },
    { field: "raiting", headerName: "Raiting", minWidth: 150 },
    { field: "state", headerName: "Estado", minWidth: 150 },
    {
      field: "Banear",
      renderCell: () => {
        return <Button onClick={() => ban()}>BANEAR</Button>;
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
      raiting: "ESTRELLAS",
      state: us.isActive ? "ACTIVO" : "INACTIVO",
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
