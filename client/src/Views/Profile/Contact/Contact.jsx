import React from "react";
import { Form, Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import NavBarShop from "../../../Components/NavBar/NavBarShop";
import Footer from "../../../Components/Footer/Footer";
import styleContainer from "../../../Components/GlobalCss/InContainer.module.css";
import styles from "./Contact.module.css"

export default function Contact({ user }) {
  return (
    <main>
      <NavBarShop />
      <div className={styleContainer.container}>
        <div className={styles.container}>
          <h1>¡Nos encanta estar comunicados!</h1>
          <p>
            Te dejamos este espacio para que puedas escribirnos acerca de
            cualquier asunto relacionado a <strong>yumPaw</strong>. ¡Queremos
            seguir mejorando tu experiencia!
          </p>
          <div>
            <Form>
              <label htmlFor="">Tu nombre</label>
              <Form.Input></Form.Input>
              <label htmlFor="Dejanos un mensaje!">Dejanos tu mensaje:</label>
              <Form.TextArea></Form.TextArea>
              <div className={styles.buttonFlex}>
              <div className={styles.margin}>
                <button className="secondaryButton">Cancelar</button>
              </div>
              <button className="primaryButton">Enviar mensaje</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
