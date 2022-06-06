import React, { useState } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putProvider } from "../../redux/actions/ownProvActions";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "./Walk.module.css";

export default function Walk() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [infoProvider, setInfoProvider] = useState({
    email: user.email,
  });

  console.log("user", user);

  const formik = useFormik({
    initialValues: {
      email: user.email,
      name: user.given_name,
      lastName: user.family_name,
      dogsPerWalk: "",
      price: "",
      description: "",
    },

    //   validationSchema:yup.object({
    //       city:yup.string().required(),
    //       state:yup.string().required(),
    //       road:yup.string().required(),
    //   }),

    onSubmit: (formData) => {
      dispatch(putProvider(formData));
      console.log("formData", formData);
      // dispatch(postProvider(newProvider));
      navigate("/profile");
    },
  });

  return (
    <div>
      <NavBar />
      <Container>
        <div className={styles.container}>
          <h2>Contanos los detalles de tu servicio</h2>

          
            <Form onSubmit={formik.handleSubmit}>
            <div className={styles.formCont}>
              <Form.Input
                type="number"
                placeholder="Cantidad máxima de perros por paseo"
                name="dogsPerWalk"
                onChange={formik.handleChange}
                //   error={formik.errors.city}
              ></Form.Input>
              <Form.Input
                type="number"
                placeholder="Precio por hora"
                name="price"
                onChange={formik.handleChange}
                //   error={formik.errors.state}
              ></Form.Input>
              <Form.Input
                type="text"
                placeholder="Contanos por qué deberían elegirte"
                name="description"
                onChange={formik.handleChange}
                //   error={formik.errors.state}
              ></Form.Input>

              <Button type="submit">Enviar</Button>
              </div>
            </Form>
          
        </div>
      </Container>
      <Footer />
    </div>
  );
}
