import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";

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
      dogsPerWalk: "",
      housingPhotos: [],
      description: "",
    },
    //   validationSchema:yup.object({
    //       city:yup.string().required(),
    //       state:yup.string().required(),
    //       road:yup.string().required(),
    //   }),

    onSubmit: (formData) => {
      Swal.fire({
        title: '¿Estás seguro que querés guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `Cancelar`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(putProvider(formData));
          console.log("formData", formData);
          Swal.fire('¡Tu informacion se guardó correctamente!', '', 'success')
          dispatch(putProvider(formData));
          navigate('/mi-perfil')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no fueron realizados.', '', 'info')
        }
      })

      // dispatch(postProvider(newProvider));
      // navigate("/mi-perfil");
    },
  });

  const categoriesOptions = [
    { key: "casa", value: "casa", text: "casa" },
    { key: "departamento", value: "cepartamento", text: "departamento" },
    { key: "quinta", value: "quinta", text: "quinta" },
  ];
  return (
    <div>
      <NavBar />
      <Container>
        <div className={styles.container}>
          <h2>Cuéntanos los detalles de tu servicio</h2>
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
                placeholder="Cantidad máxima de perros por hospedaje"
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
              placeholder="Cuéntanos por qué deberían elegirte"
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
            <Link to='/mi-perfil'><Button>Cancelar</Button></Link>
            <Button type="submit">Confirmar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
