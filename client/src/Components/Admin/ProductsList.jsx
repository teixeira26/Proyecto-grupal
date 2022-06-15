import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, selectedProduct, putProduct } from '../../redux/actions/petshopActions';
import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBarShop';
import Footer from "../Footer/Footer";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";

export default function ProductsList() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  useEffect(() => {
  }, [products]);

  function clickSelectProduct(id) {
    dispatch(selectedProduct(id))
    navigate('/admin/modificar-producto')
  }

  function addProduct() {
    navigate('/admin/agregar-productos')
  }

  function inactive(id) {
    Swal.fire({
      title: 'zConfirme que desea desactivar esta publicación',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Descartar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Publicación DESACTIVADA', '', 'success')
        dispatch(putProduct(id, { isActive: false }))
        dispatch(getProducts())
      } else if (result.isDenied) {
        Swal.fire('La publicación continúa ACTIVA', '', 'info')
      }
    })
  }

  function active(id) {
    Swal.fire({
      title: 'Confirme que desea activar esta publicación',
      showDenyButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: `Descartar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Publicación ACTIVADA', '', 'success')
        dispatch(putProduct(id, { isActive: true }))
        dispatch(getProducts())
      } else if (result.isDenied) {
        Swal.fire('La publicación continúa DESACTIVADA', '', 'info')
      }
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 50 },
    { field: 'name', headerName: 'Nombre', minWidth: 300 },
    { field: 'price', headerName: 'Precio', minWidth: 100 },
    { field: 'stock', headerName: 'Stock', minWidth: 100 },
    { field: 'category', headerName: 'Categoría', minWidth: 150 },
    { field: 'tradeMark', headerName: 'Marca', minWidth: 100 },
    { field: 'targetAnimal', headerName: 'Mascota', minWidth: 100 },
    { field: 'state', headerName: 'Estado', minWidth: 100 },
    {
      field: null,
      renderCell: (cellValues) => {
        return cellValues.row.state === 'INACTIVO' ?
          <Button onClick={() => active(cellValues.id)}>ACTIVAR</Button> :
          <Button onClick={() => inactive(cellValues.id)}>DESACTIVAR</Button>;
      }
    },

    {
      field: 'Modificar',
      renderCell: (cellValues) => {
        console.log('cellValues', cellValues)
        return (
          <Button onClick={() => clickSelectProduct(cellValues.id)}>MODIFICAR</Button>
        );
      }
    },
    {
      field: 'Ver',
      renderCell: (cellValues) => {
        return <Link to={`/shop/${cellValues.id}`}>VER</Link>;
      }
    },
  ];

  const rows = products.map(prod => {
    return {
      id: prod.id,
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      category: prod.category,
      tradeMark: prod.tradeMark,
      targetAnimal: prod.targetAnimal,
      state: prod.isActive ? 'ACTIVO' : 'INACTIVO',
    }
  })

  function back() {
    navigate('/admin/dashboard')
  }

  return (
    <>
      <NavBar />
      <Button onClick={addProduct}>AGREGAR NUEVO PRODUCTO</Button>
      <Table stickyHeader aria-label="sticky table">
        <TableRow stickyHeader aria-label="sticky table">
          <TableCell align="center" colSpan={7}>
            LISTADO DE PRODUCTOS
          </TableCell>
        </TableRow>
      </Table>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}
        />
      </div>
      <Button onClick={back}>REGRESAR</Button>
      <Footer />
    </>
  );
}
