import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putProvider } from "../../redux/actions/ownProvActions";
import { useNavigate } from "react-router-dom";



export default function InfoProvider() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate()

  
  const formik = useFormik({
    initialValues: {
      email:user.email,
      address:{},  
      city: "",
      state: "",
      road:"",
    },

    validationSchema:yup.object({
        city:yup.string().required(),
        state:yup.string().required(),
        road:yup.string().required(),
    }),

    onSubmit: (formData) => {
      formData = {
          email:formData.email,
          address:{
              city:formData.city,
              state:formData.state,
              road:formData.road
          }
      }
      console.log(formData);
      dispatch(putProvider(formData.email, formData));
      navigate('/home')
    },
  });

  return (
    <Container>
      <h2>Antes de Seguir necesitamos más información</h2>

      <Form onSubmit={formik.handleSubmit}>
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
      </Form>
    </Container>
  );
}
