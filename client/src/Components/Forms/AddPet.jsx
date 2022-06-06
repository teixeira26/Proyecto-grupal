import React from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getPets, postPet } from "../../redux/actions/ownProvActions";
import { useNavigate } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";



export default function InfoProvider() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate()

  
  const formik = useFormik({
    initialValues: {
      ownerEmail:user.email,
      name: '',
      type: '',
      race: '',
      size: '',
      description:'',
      ownerName: '',
      photos: [],
    },
    validationSchema:yup.object({
      name:yup.string().required(),
      race:yup.string().required(),
      size:yup.string().required(),
      type:yup.string().required(),

      description:yup.string().required(),
    }),

    onSubmit: async(formData) => {
      console.log(formData);
      await dispatch(postPet(formData.userEmail, formData));
      navigate('/profile')
      dispatch(getPets());
    },
  });



  const categoriesOptions = [
    {key:"Grande", value:"Grande", text:"Grande"},{key:"Mediano", value:"Mediano", text:"Mediano"},{key:"Chico", value:"Chico", text:"Chico"}
  ]

  const categoriesOptionstype = [
    {key:"Perro", value:"Perro", text:"Perro"},{key:"Gato", value:"Gato", text:"Gato"},{key:"Conejo", value:"Conejo", text:"Conejo"},{key:"Tortuga", value:"Tortuga", text:"Tortuga"}
  ]

  return (
    <Container>
      <h2>Agregá un Pet</h2>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Nombre"
          name="name"
          onChange={formik.handleChange}
          error={formik.errors.name}
        ></Form.Input>

        <Form.Input
          type="text"
          placeholder="Raza"
          name="race"
          onChange={formik.handleChange}
          error={formik.errors.race}
        ></Form.Input>

        <Form.Input
          type="text"
          placeholder="Description"
          name="description"
          onChange={formik.handleChange}
          error={formik.errors.race}
        ></Form.Input>


        <Form.Dropdown
        placeholder="Tamaño"
        options={categoriesOptions}
        onChange={(e)=>{
          console.log(e.target.firstChild.textContent)
          e.target.value = e.target.firstChild.textContent
          e.target.name = "size"
          // console.log(e.target)
          console.log(e.target.value)
          formik.handleChange(e)
        }}
        selection={true}
        error={formik.errors.size}
        ></Form.Dropdown>


      <Form.Dropdown
        placeholder="Tipo"
        options={categoriesOptionstype}
        onChange={(e)=>{
          e.target.value = e.target.firstChild.textContent
          e.target.name = "type"
          // console.log(e.target)
          // console.log(e.target.value)
          formik.handleChange(e)
        }}
        selection={true}
        error={formik.errors.type}
        ></Form.Dropdown>


      <Widget 
      publicKey='269841dc43864e62c49d' 
      id='file'
      name="photos"
      onChange={(e)=>{
        formik.values.photos.push(e.originalUrl)
        console.log(formik)
      }}
      perrito="profilePicture"
      />
      <Button type="submit">Enviar</Button>
      </Form>
    </Container>
  );
}
