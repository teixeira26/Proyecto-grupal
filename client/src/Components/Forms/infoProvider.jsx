import React, { useState } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putProvider } from "../../redux/actions/ownProvActions";


export default function InfoProvider() {
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const [infoProvider, setInfoProvider] = useState({
    email: user.email,
  });
  console.log("infoProvider", infoProvider.email);

  
  const formik = useFormik({
    initialValues: {
      city: "",
      state: "",
      service: "",
      typeOfHousing: "",
      dogsPerWalk: 0,
    },

    validationSchema:yup.object({
        city:yup.string().required(),
        state:yup.string().required(),
        service:yup.string().required(),
        typeOfHousing:yup.string().required(),
        dogsPerWalk:yup.number().required(),
    }),

    onSubmit: (formData) => {
      console.log(formData);
      dispatch(putProvider(infoProvider.email, formData));
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

        <Form as="select" name="service" onChange={formik.handleChange} error={formik.errors.service}>
          <option hidden={true}>Servicio que ofrecés</option>
          <option value="paseo">Paseo</option>
          <option value="hospedaje">Hospedaje</option>
        </Form>

        <br />

        <h3>Si querés hospedar...</h3>

        <Form as="select" name="typeOfHousing" onChange={formik.handleChange} error={formik.errors.typeOfHousing}>
          <option hidden={true}>Tipo de vivienda</option>
          <option value="casa">Casa</option>
          <option value="departamento">Departamento</option>
          <option value="quinta">Quinta</option>
        </Form>

        <br />

        <h3>Si querés ser paseador...</h3>
        <Form as="select" name="dogsPerWalk" onChange={formik.handleChange} error={formik.errors.dogsPerWalk}>
          <option hidden={true}>Cantidad de perros por paseo</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Form>

        <br />

        <Button type="submit">Enviar</Button>
      </Form>
    </Container>
  );
}
