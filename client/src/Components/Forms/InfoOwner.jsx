import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { Widget } from "@uploadcare/react-widget";
import { putOwnerInfo } from "../../redux/actions/ownProvActions";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import style from "./InfoOwner.module.css"

export default function InfoOwner() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      profilePicture: [],
      address: {},
    },
    validationSchema: yup.object({
      city: yup.string().required(),
      road: yup.string().required(),
      state: yup.string().required(),
    }),

    onSubmit: (formData) => {
      formData = {
        ...formData,
        address: {
          city: formData.city,
          road: formData.road,
          state: formData.state,
        },
      };
      console.log(formData);
      dispatch(putOwnerInfo(formData.email, formData));
      navigate("/mi-perfil");
    },
  });

  return (
    <div>
      <NavBar />
      <Container>
        <div className={style.container}>
          <h2>Cambia tus datos</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type="text"
              placeholder="Localidad"
              name="state"
              onChange={formik.handleChange}
              error={formik.errors.state}
            ></Form.Input>
            <Form.Input
              type="text"
              placeholder="Dirección"
              name="road"
              onChange={formik.handleChange}
              error={formik.errors.road}
            ></Form.Input>
            <Form.Input
              type="text"
              placeholder="Provincia"
              name="city"
              onChange={formik.handleChange}
              error={formik.errors.city}
            ></Form.Input>
            <Widget
              publicKey="269841dc43864e62c49d"
              id="file"
              name="photos"
              onChange={(e) => {
                formik.values.profilePicture.push(e.originalUrl);
                console.log(formik);
              }}
              perrito="profilePicture"
            />
            <Button type="submit">Confirmar cambios</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};
