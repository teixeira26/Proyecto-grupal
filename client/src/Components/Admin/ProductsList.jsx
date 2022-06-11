import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@material-ui/core/Button'

import NavBarShop from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/petshopActions';
import { useEffect } from 'react';


export default function ProductsList(){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())

    }, [dispatch])

    const products = useSelector(state => state.products)


    return (
        <>
        <NavBarShop />

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Pecio</TableCell>
            <TableCell align="right">Stock</TableCell>
            <TableCell align="right">Categoría</TableCell>
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Mascota</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.tradeMark}</TableCell>
              <TableCell align="right">{row.targetAnimal}</TableCell>
              <TableCell align="right"><Button >MODIFICAR</Button></TableCell>
              <TableCell align="right"><Button >DESACTIVAR</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


        <Footer />
        </>
    )
}