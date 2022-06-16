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
      title: '¿Estás seguro que querés desactivar esta publicación?',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      confirmButtonText: 'Desactivar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('¡La publicación quedó desactivada!', '', 'success')
        dispatch(putProduct(id, { isActive: false }))
        dispatch(getProducts())
      } else if (result.isDenied) {
        Swal.fire('La publicación sigue activa.', '', 'info')
      }
    })
  }

  function active(id) {
    Swal.fire({
      title: '¿Estás seguro que querés activar esta publicación?',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      confirmButtonText: 'Activar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('¡La publicación fue activada!', '', 'success')
        dispatch(putProduct(id, { isActive: true }))
        dispatch(getProducts())
      } else if (result.isDenied) {
        Swal.fire('La publicación sigue desactivada', '', 'info')
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
          <Button onClick={() => active(cellValues.id)}>Activar</Button> :
          <Button onClick={() => inactive(cellValues.id)}>Desactivar</Button>;
      }
    },

    {
      field: 'Modificar',
      renderCell: (cellValues) => {
        console.log('cellValues', cellValues)
        return (
          <Button onClick={() => clickSelectProduct(cellValues.id)}>Modificar</Button>
        );
      }
    },
    {
      field: 'Ver',
      renderCell: (cellValues) => {
        return <Link to={`/shop/${cellValues.id}`}>Ver</Link>;
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
      <Button onClick={addProduct}>Agregar producto</Button>
      <Table stickyHeader aria-label="sticky table">
        <TableRow stickyHeader aria-label="sticky table">
          <TableCell align="center" colSpan={7}>
            Lista de productos
          </TableCell>
        </TableRow>
      </Table>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}
        />
      </div>
      <Button onClick={back}>Volver</Button>
      <Footer />
    </>
  );
}
