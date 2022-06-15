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
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [workDays, setWorkDays] = useState([])


  const onChangeDatePicker = (fecha)=>{
    setStartDate(fecha[0]);
    console.log('Fecha inicial: ', fecha[0].toLocaleString().split(' ')[0])

    setEndDate(fecha[1]?fecha[1]:null)
    console.log('fecha final: ', fecha[1]?fecha[1].toLocaleString().split(' ')[0]:null)

    if(fecha[0] && fecha[1]){
      var fechasSeleccionadas = [];
      const diasTranscorridos = restarFechas(fecha[0].toLocaleString().split(' ')[0], fecha[1].toLocaleString().split(' ')[0]);
      const fechaInicial = restarFechas(new Date().toLocaleString().split(' ')[0], fecha[0].toLocaleString().split(' ')[0])
      console.log('diferencia entre la fecha inicial y la fecha actual', fechaInicial)
      console.log('dias transcorridos entre la fecha final y inicial: ', diasTranscorridos);
      for (var x = 0; x<diasTranscorridos+1; x++){
        console.log('x : ',fechaInicial + x)
        fechasSeleccionadas.push(sumarDias(new Date(),fechaInicial + x))
      }
    }
    console.log(fechasSeleccionadas);
    if(fechasSeleccionadas)setWorkDays([...workDays, fechasSeleccionadas])
  }

const restarFechas = function(f1,f2){
  var aFecha1 = f1.split('/');
  var aFecha2 = f2.split('/');
  var fFecha1 = Date.UTC(aFecha1[2].slice(0, 4),aFecha1[1]-1,aFecha1[0]);
  var fFecha2 = Date.UTC(aFecha2[2].slice(0, 4),aFecha2[1]-1,aFecha2[0]);
  var dif = fFecha2 - fFecha1;
  var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
  return dias;
 }

 function sumarDias(date, dias){
  let newDate = date
    newDate.setDate(newDate.getDate() + dias);
  return newDate.toLocaleString().split(' ')[0];
}


  

  const formik = useFormik({
    initialValues: {
      schedule:[]
    },
    validationSchema: yup.object({
      // message: yup.string().required('Este es un campo requerido'),
    }),

    onSubmit: async(formData) => {
      console.log(workDays)
      formData = {
        providerEmail:user.email,
        schedule:workDays.reduce((x,y)=>x.concat(y))
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
  const deleteRange = (range)=>{
    let newWorkDays = workDays.filter(x=> x!== range);
    setWorkDays(newWorkDays);
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
            <DatePicker
              selected={startDate}
              onChange={onChangeDatePicker}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              showDisabledMonthNavigation
              selectsRange
              inline
            />
          
           

            {workDays?workDays.map(x=>{
              if(x && x.length) return(
              <div>
                <p>{x[0]} - {x[x.length-1]}</p>
                <input type='button' onClick={()=>deleteRange(x)} value='x'></input>
              </div>
              )
              
            }):null}

          

         
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
