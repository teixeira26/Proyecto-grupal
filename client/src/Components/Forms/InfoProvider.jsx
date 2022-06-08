import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { postProvider, putProvider } from "../../redux/actions/ownProvActions";
import { Link, useNavigate } from "react-router-dom";
import style from "./InfoProvider.module.css";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";

export default function InfoProvider() {
  const { user } = useAuth0();
  const dispatch = useDispatch();

  function walk() {
    dispatch(
      postProvider({
        email: user.email,
        name: user.given_name,
        lastName: user.family_name,
        service: ["paseo"],
      })
    );
  }

  function lodging() {
    dispatch(
      postProvider({
        email: user.email,
        name: user.given_name,
        lastName: user.family_name,
        service: ["hospedaje"],
      })
    );
  }

  return (
    <div>
      <NavBar />
      <div className={style.container}>
        <Container>
          <div className={style.centerFlex}>
            <h2>¿Qué servicio te gustaría ofrecer?</h2>
            <div className={style.buttons}>
              <div className={style.button}>
              <Link to="/paseo">
                <button onClick={walk}>PASEO</button>
              </Link>
              </div>
              
              <div>
              <Link to="/hospedaje">
                <button onClick={lodging}>HOSPEDAJE</button>
              </Link>
              </div>
              
            </div>

            {/* <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Localidad"
          name="city"
          onChange={formik.handleChange}
          error={formik.errors.city}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Provincia"
          name="state"
          onChange={formik.handleChange}
          error={formik.errors.state}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Dirección"
          name="road"
          onChange={formik.handleChange}
          error={formik.errors.state}
        ></Form.Input>


        <Button type="submit">Enviar</Button>
      </Form> */}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
