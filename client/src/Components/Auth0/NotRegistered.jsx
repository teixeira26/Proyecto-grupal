import React, { useEffect } from "react";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBarShop";
import styles from "./NotRegistered.module.css";
import InContainer from "../GlobalCss/InContainer.module.css";
import { Link } from "react-router-dom";

export const NotRegistered = () => {
  //   useEffect(() => {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: "Para continuar debes iniciar sesión",
  //       footer: '<a href="">Why do I have this issue?</a>',
  //     });
  //   }, []);
  return (
    <div>
      <div className={InContainer.container}>
        <div className={styles.container}>
          <img src="./assets/img/not-registered.png" alt="" className={styles.img} />
          <div className={styles.log}>
            <h1 className={styles.text}>
              ¡OOPS! <br /> Para continuar tenés que iniciar sesión
            </h1>
            <Link to='/'>
              <button className='primaryButton'>Ir al inicio</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotRegistered;
