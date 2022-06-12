import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getSolds } from "../../redux/actions/ownProvActions";
import { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";

export default function SalesReceipts() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSolds());
  }, [dispatch]);

  const solds = useSelector((state) => state.solds);

  function detail() {
    
  }

  const columns = [
    { field: "id", headerName: "ID de la compra", minWidth: 200 },
    { field: "name", headerName: "Nombre", minWidth: 150 },
    { field: "lastName", headerName: "Apellido", minWidth: 150 },
    { field: "transaction_amount", headerName: "Valor total", minWidth: 150 },
    { field: "date_created", headerName: "Fecha de compra", minWidth: 230 },
    { field: "status", headerName: "Estado", minWidth: 150 },
    {
      field: "Detalle",
      renderCell: (cellValues) => {
        return (

        <Button onClick={() => detail(cellValues.id)}>Detalle</Button>
        )
      },
    },
  ];

  const rows = solds.map((so) => {
    return {
      id: so.id,
      name: so.first_name,
      lastName: so.last_name,
      transaction_amount: so.transaction_amount,
      date_created: so.date_created,
      status: so.status,
    };
  });

  return (
    <>
      <NavBar />
      <Table stickyHeader aria-label="sticky table">
        <TableRow stickyHeader aria-label="sticky table">
          <TableCell align="center" colSpan={7}>
            TRANSACCIONES HECHAS EN LA PLATAFORMA
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