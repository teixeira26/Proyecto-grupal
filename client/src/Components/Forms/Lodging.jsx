import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { Widget } from "@uploadcare/react-widget";
import { putProvider } from "../../redux/actions/ownProvActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import styles from "./Lodging.module.css";

export default function Lodging() {
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
      typeOfHousing: "",
      price: "",
      housingPhotos: [],
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
      navigate("/mi-perfil");
    },
  });

  const categoriesOptions = [
    { key: "Casa", value: "Casa", text: "Casa" },
    { key: "Departamento", value: "Departamento", text: "Departamento" },
    { key: "Quinta", value: "Quinta", text: "Quinta" },
  ];
  return (
    <div>
      <NavBar />
      <Container>
        <div className={styles.container}>
          <h2>Contanos los detalles de tu servicio</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Dropdown
              placeholder="Tipo de vivienda"
              options={categoriesOptions}
              onChange={(e) => {
                e.target.value = e.target.textContent;
                e.target.name = "typeOfHousing";
                // console.log(e.target)
                console.log(e.target.value);
                formik.handleChange(e);
              }}
              selection={true}
              error={formik.errors.size}
            ></Form.Dropdown>
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
            <p>Mostranos fotos del lugar</p>
            <Widget
              publicKey="269841dc43864e62c49d"
              id="file"
              name="photos"
              onChange={(e) => {
                formik.values.photos.push(e.originalUrl);
                console.log(formik);
              }}
              perrito="profilePicture"
            />
            <br />
            <br />
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
