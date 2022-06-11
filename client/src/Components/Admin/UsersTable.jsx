import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { getProviders, getOwners } from '../../redux/actions/ownProvActions';
import {useEffect} from 'react'
import Button from '@material-ui/core/Button'
import NavBar from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";




export default function UsersTable() {
  
    const dispatch = useDispatch()
    const users = useSelector(state => state.owners)


    useEffect(()=>{
        dispatch(getOwners())
        dispatch(getProviders())

    }, [dispatch])

      const providers = useSelector(state => state.providers)



  return (
    <>
    <NavBar />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Ofrece servicio</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right"></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{providers.find(el =>el.email === row.email)? 'SÍ' : 'NO'}</TableCell>
              <TableCell align="right">{row.isActive? 'ACTIVO' : 'INACTIVO'}</TableCell>
              
              <TableCell align="right"><Button >BANEAR</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Footer />
    </>
  );
}
