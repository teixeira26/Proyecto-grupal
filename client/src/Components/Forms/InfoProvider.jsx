import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { postProvider, putProvider } from "../../redux/actions/ownProvActions";
import { Link, useNavigate } from "react-router-dom";



export default function InfoProvider() {

    const { user } = useAuth0();
    const dispatch = useDispatch();



  function walk(){
    dispatch(postProvider({
      email:user.email,
      name:user.given_name,
      lastName: user.family_name,
      service: 'paseo'
    }))
  }


  function lodging(){
    dispatch(postProvider({
      email:user.email,
      name:user.given_name,
      lastName: user.family_name,
      service: 'hospedaje'
    }))
  }




  return (
    <Container>
      <h2>¿Qué servicio te gustaría ofrecer?</h2>
      <Link to='/paseo'>
          <button onClick={walk}>PASEO</button>
      </Link>
      <Link to='/hospedaje'>
          <button  onClick={lodging}>HOSPEDAJE</button>
      </Link>



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
    </Container>
  );
}
