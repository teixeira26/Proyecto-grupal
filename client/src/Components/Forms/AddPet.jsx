import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { Widget } from "@uploadcare/react-widget";
import { getPets, postPet } from "../../redux/actions/ownProvActions";
import NavBar from "../NavBar/NavBarShop";
import inContainer from "../GlobalCss/InContainer.module.css";
import style from "./Form.module.css";
import axios from "axios";
import Footer from "../Footer/Footer";

export default function InfoProvider() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const auth0 = useAuth0();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerEmail: user.email,
      name: "",
      type: "",
      race: "",
      size: "",
      description: "",
      ownerName: "",
      photos: [],
    },
    validationSchema: yup.object({
      name: yup.string().required('Ponle un nombre a tu mascota'),
      race: yup.string().required('Indícanos de qué raza es tu mascota'),
      size: yup.string().required('Indícanos de qué tamaño es tu mascota'),
      type: yup.string().required('Indícanos qué tipo de animal es tu mascota')
    }),

    onSubmit: async (formData) => {
      console.log(formData);
      await dispatch(postPet(formData.userEmail, formData));
      navigate("/mi-perfil");
      dispatch(getPets());
    },
  });

  const categoriesOptions = [
    { key: "Grande", value: "Grande", text: "Grande" },
    { key: "Mediano", value: "Mediano", text: "Mediano" },
    { key: "Chico", value: "Chico", text: "Chico" },
  ];

  const categoriesOptionsType = [
    { key: "Perro", value: "Perro", text: "Perro" },
    { key: "Gato", value: "Gato", text: "Gato" },
    { key: "Conejo", value: "Conejo", text: "Conejo" },
    { key: "Tortuga", value: "Tortuga", text: "Tortuga" },
  ];

  return (
    <div>
      <NavBar />
      <div className={inContainer.container}>
        <div className={style.container}>
          <h2>Agregá una mascota</h2>
          <p>Ingresa información como su nombre, raza y tamaño. También podrás agregar una foto para que podamos verla!</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type="text"
              placeholder="Nombre"
              name="name"
              onChange={formik.handleChange}
              error={formik.errors.name}
            ></Form.Input>
            <Form.Dropdown
              placeholder="Tipo de mascota"
              options={categoriesOptionsType}
              onChange={(e) => {
                e.target.value = e.target.firstChild.textContent;
                e.target.name = "type";
                formik.handleChange(e);
              }}
              selection={true}
              error={formik.errors.type}
            ></Form.Dropdown>
            <Form.Input
              type="text"
              placeholder="Raza"
              name="race"
              onChange={formik.handleChange}
              error={formik.errors.race}
            ></Form.Input>
            <Form.Dropdown
              placeholder="Tamaño"
              options={categoriesOptions}
              onChange={(e) => {
                console.log(e.target.firstChild.textContent);
                e.target.value = e.target.firstChild.textContent;
                e.target.name = "size";
                // console.log(e.target)
                console.log(e.target.value);
                formik.handleChange(e);
              }}
              selection={true}
              error={formik.errors.size}
            ></Form.Dropdown>
            <Form.Input
              type="text"
              placeholder="Descripción"
              name="description"
              onChange={formik.handleChange}
              error={formik.errors.race}
            ></Form.Input>
            <label htmlFor="">Selecciona una foto de tu mascota</label>
            <br />
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
            <div className={style.buttons}>
              <Link to="/mi-perfil"><button className="secondaryButton">Cancelar</button></Link>
              <button className="primaryButton" type="submit">Agregar mascota</button>
            </div>
          </Form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
