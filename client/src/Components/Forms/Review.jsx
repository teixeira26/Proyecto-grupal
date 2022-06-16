import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putOwnerInfo } from "../../redux/actions/ownProvActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import style from "./Star.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Review({ service }) {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const providerEmail = useParams().providerEmail

  const formik = useFormik({
    initialValues: {
      message: "",
      providerEmail,
      OwnerName: user.given_name,
      review: '',
      ownerEmail: user.email,
    },
    validationSchema: yup.object({
      message: yup.string().required('Necesitamos que dejes un mensaje'),
    }),

    onSubmit: async (formData) => {
      formData = {
        ...formData,
      };
      console.log(formData);
      Swal.fire({
        title: '¿Estás seguro que querés enviar esta reseña?',
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: 'Enviar'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('¡La reseña fue enviada con éxito!', '', 'success')
          await axios.post('https://proyecto-grupal.herokuapp.com/reviews', formData)
          navigate('/inicio')
        } else if (result.isDenied) {
          Swal.fire('La reseña no fue enviada.', '', 'info')
        }
      })
    }
  });

  return (
    <div>
      <NavBar />
      <Container>
        <div className={style.container}>
          <h2>Dejanos una reseña acerca de tu experiencia</h2>
          <p>¡Deja asentada la misma para que otros usuarios puedan conocer un poco mas a este yumpi!</p>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type="text"
              placeholder="Contanos un poco más..."
              name="message"
              onChange={formik.handleChange}
              error={formik.errors.message}
            ></Form.Input>
            <button className={style.star}
              onClick={() => { formik.values.review = 1 }}
              value='1' name="review">{formik.values.review >= 1 ? '★' : '☆'}</button>
            <button className={style.star}
              onClick={() => { formik.values.review = 2 }}
              value='2'>{formik.values.review >= 2 ? '★' : '☆'}</button>
            <button className={style.star}
              onClick={() => { formik.values.review = 3 }}
              value='3'>{formik.values.review >= 3 ? '★' : '☆'}</button>
            <button className={style.star}
              onClick={() => { formik.values.review = 4 }}
              value='4'>{formik.values.review >= 4 ? '★' : '☆'}</button>
            <button className={style.star}
              onClick={() => { formik.values.review = 5 }}
              value='5'>{formik.values.review === 5 ? '★' : '☆'}</button>
            <Link to={`/yumpis/${providerEmail}`}>
              <button className="secondaryButton">Cancelar</button>
            </Link>
            <button className="primaryButton" type="submit">Enviar reseña</button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
