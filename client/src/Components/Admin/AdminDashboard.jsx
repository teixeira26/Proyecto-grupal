import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBarShop'
import Footer from '../Footer/Footer'
import styles from './AdminDashboard.module.css'


export default function AdminDashboard (){

    return(
        <div>
            <NavBar />
            <div className={styles.container}>
            <Link to='/admin/listado-productos'><button>LISTADO PRODUCTOS</button></Link>
            <Link to='/admin/sales-receipts'><button>COMPROBANTES DE COMPRAS</button></Link>
            <Link to='/admin/get-users'><button>USUARIOS REGISTRADOS</button></Link>
            </div>
            <Footer />
        </div>
    )

}



