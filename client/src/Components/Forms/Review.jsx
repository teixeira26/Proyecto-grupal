import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { putOwnerInfo } from "../../redux/actions/ownProvActions";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import style from "./Star.module.css";
import axios from "axios";

export default function Review() {
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
      ownerEmail:user.email,
    },
    validationSchema: yup.object({
      message: yup.string().required('Este es un campo requerido'),
    }),

    onSubmit: async(formData) => {
      formData = {
        ...formData,
      };
      console.log(formData);
      // await dispatch(putOwnerInfo(formData.email, formData));
      await axios.post('http://localhost:3001/reviews', formData)

      // navigate("/profile");
    },
  }); 

  return (
    <div>
      <NavBar />
      <Container>
        <div className={style.container}>
          <h2>Cambiá tus datos</h2>

          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              type="text"
              placeholder="Contanos un poco más"
              name="message"
              onChange={formik.handleChange}
              error={formik.errors.message}
            ></Form.Input>
            
            
            
            <button className={style.star}
            onClick={()=>{formik.values.review = 1} }
            value='1'name="review">{formik.values.review>=1?'★':'☆'}</button>
            <button className={style.star}
            onClick={()=>{formik.values.review = 2} }
            value='2'>{formik.values.review>=2?'★':'☆'}</button>
            <button className={style.star}
            onClick={()=>{formik.values.review = 3} }
            value='3'>{formik.values.review>=3?'★':'☆'}</button>
            <button className={style.star}
            onClick={()=>{formik.values.review = 4} }
            value='4'>{formik.values.review>=4?'★':'☆'}</button>
            <button className={style.star}
            onClick={()=>{formik.values.review = 5} }
            value='5'>{formik.values.review===5?'★':'☆'}</button>
            

         
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
