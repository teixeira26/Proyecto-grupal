import React from "react";
import NavBarShop from "../../../Components/NavBar/NavBarShop";
import Footer from "../../../Components/Footer/Footer";
import styleContainer from "../../../Components/GlobalCss/InContainer.module.css";
import style from "./About.module.css";

export default function About() {
  return (
    <main>
      <NavBarShop />
      <div className={styleContainer.container}>
        <div className={style.container}>
          <h1 className={style.title}>¡Nosotros somos yumPaw!</h1>
          <div className={style.start}>
            <img src="/assets/img/about-dog-1.png" alt="" />
            <p className={style.p}>
              Una plataforma pensada por y para el <strong>bienestar</strong> de
              tus mascotas, donde podrás encontrar las mejores alternativas para
              que tus animales puedan <strong>pasear y hospedarse</strong>, y
              que tu puedas conseguir los mejores <strong>productos</strong>{" "}
              para cuidarlos y entretenerlos.
            </p>
          </div>
          <br />
          <div className={style.end}>
            <div>
              <h3>¿Cómo nace nuestro proyecto?</h3>
              <p>
                Partimos desde la necesidad que tienen las personas en su día a
                día a la hora de buscar{" "}
                <strong>gente honesta, de confianza</strong>, y que brinde la{" "}
                <strong>seguridad</strong> suficiente para dejarles en sus manos
                a nuestros seres más queridos: nuestras mascotas. Creemos que
                hoy existe una gran <strong>dificultad</strong> para llevar esto
                a cabo y que estas personas puedan estar tranquilas cuando sus
                animales estén paseando u hospedándose en un lugar distinto al
                habitual.
              </p>
            </div>
            <img src="/assets/img/about-dog-2.png" alt="" />
          </div>
          <div className={style.start}>
            <img src="/assets/img/about-cat-3.png" alt="" />
            <div>
              <h3>¿Cuál es nuestro objetivo?</h3>
              <p>
                Queremos que todas las mascotas registradas en nuestra
                plataforma puedan conseguir la mejor{" "}
                <strong>experiencia</strong> tanto en sus paseos como en sus
                hospedajes, y esto se de a partir de un acuerdo{" "}
                <strong>transparente y seguro</strong> entre los usuarios.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
