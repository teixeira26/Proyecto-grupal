import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getProviderById, putOwnerInfo } from "../../redux/actions/ownProvActions";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import style from "./Star.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export default function ScheduleProviderLogdifalseng() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const providerEmail = useParams().providerEmail;

  

  const formik = useFormik({
    initialValues: {
      lunes:false,
      martes:false,
      miercoles:false,
      jueves:false,
      viernes:false,
      sabado:false,
      domingo:false
    },
    validationSchema: yup.object({
      // message: yup.string().required('Este es un campo requerido'),
    }),

    onSubmit: async(formData) => {
      formData = {
        providerEmail:user.email,
        schedule:{...formData},
        
      };
      Swal.fire({
        title: 'Estás seguro que querés guardar los cambios?',
        showDenyButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Informaciones guardadas!', '', 'success')
          await axios.put('http://localhost:3001/events/schedule',formData);
          navigate('/mi-perfil')
        } else if (result.isDenied) {
          Swal.fire('Los cambios no fueron guardados', '', 'info')
        }
      })
     
      // await dispatch(putOwnerInfo(formData.email, formData));
    },
  }); 
  const showInputs = (day, SetDay, stateDay)=>{
    return(<div>

              
              {stateDay.map((x, y)=>{
              return (<div>
                <input type='time'
                indice = {y}
                 onChange={(e)=>{
                 formik.values[day].splice(y,1,e.target.value)
                  console.log(formik.values)
                }
                }></input>
              </div>)
            })}
           <input type='button' onClick={()=>{
            let stateDayLength = stateDay.length-1
            if(formik.values[day][stateDayLength]){
              console.log('ingreesé a donde deberia estar')
            SetDay([...stateDay,0])}
            }} value="+"/>
            </div>)
  }
  return (
    <div>
      <NavBar />
      <Container>
        <div className={style.container}>
          <h2>Agregá un horario de trabajo</h2>

          <Form onSubmit={formik.handleSubmit}>
            {/* <Form.Input
              type="text"
              placeholder="Contanos un poco más"
              name="message"
              onChange={formik.handleChange}
              error={formik.errors.message}
            ></Form.Input>
             */}
            
          
            <div class="ui checkbox">
              <input type="checkbox"
              name="lunes"
              onChange={()=>{
                if(formik.values.lunes === true){
                  formik.values.lunes = false}
                  else formik.values.lunes = true
                console.log(formik.values)
              }}
              />
              <label>Lunes</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="martes"
              onChange={()=>{
                if(formik.values.martes === true){
                formik.values.martes = false}
                else formik.values.martes = true
              console.log(formik.values)
              }}
              />
              <label>Martes</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="miercoles"
              onChange={()=>{
                if(formik.values.miercoles === true){
                  formik.values.miercoles = false}
                  else formik.values.miercoles = true
                console.log(formik.values)
              }}
              />
              <label>Miércoles</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="jueves"
              onChange={()=>{
                if(formik.values.jueves === true){
                  formik.values.jueves = false}
                  else formik.values.jueves = true
                console.log(formik.values)
              }}
              />
              <label>Jueves</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="viernes"
              onChange={()=>{
                if(formik.values.viernes === true){
                  formik.values.viernes = false}
                  else formik.values.viernes = true
                console.log(formik.values)
              }}
              />
              <label>Viernes</label>
            </div>
            <div class="ui checkbox">
              <input type="checkbox"
              name="sabado"
              onChange={()=>{
                if(formik.values.sabado === true){
                  formik.values.sabado = false}
                  else formik.values.sabado = true
                console.log(formik.values)
              }}
              />
              <label>Sábado</label>
            </div>
            <div class="ui checkbox">
              <input type="checkbox"
              name="domingo"
              onChange={()=>{
                if(formik.values.domingo === true){
                  formik.values.domingo = false
                }
                  else {formik.values.domingo = true}
                console.log(formik.values)
              }}
              />
              <label>Domingo</label>
            </div>
            

         
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
