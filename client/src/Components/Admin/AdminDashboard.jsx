import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <div>
      <NavBar />
      <div className={styles.container}>
        <Link to="/admin/listado-productos">
          <button className="primaryButton">Ver lista de productos</button>
        </Link>
        <Link to="/admin/ventas-petshop">
          <button className="primaryButton">Ver lista de compras</button>
        </Link>
        <Link to="/admin/get-users">
          <button className="primaryButton">Ver usuarios registrados</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
