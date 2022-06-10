import React, { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export default function ScheduleProvider() {
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const providerEmail = useParams().providerEmail
  const [lunes, SetLunes] = useState([]);
  const [martes, SetMartes] = useState([]);
  const [miercoles, SetMiercoles] = useState([]);
  const [jueves, SetJueves] = useState([]);
  const [viernes, SetViernes] = useState([]);
  const [sabado, SetSabado] = useState([]);
  const [domingo, SetDomingo] = useState([]);


  const formik = useFormik({
    initialValues: {
      lunes:[],
      martes:[],
      miercoles:[],
      jueves:[],
      viernes:[],
      sabado:[],
      domingo:[]
    },
    validationSchema: yup.object({
      // message: yup.string().required('Este es un campo requerido'),
    }),

    onSubmit: async(formData) => {
      formData = {
        providerEmail:user.email,
        schedule:{...formData}
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
                SetLunes(['ojkioj'])
              }}
              />
              <label>Lunes</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="martes"
              onChange={()=>{
                SetMartes(['ojkioj'])
              }}
              />
              <label>Martes</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="miercoles"
              onChange={()=>{
                SetMiercoles(['ojkioj'])
              }}
              />
              <label>Miércoles</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="jueves"
              onChange={()=>{
                SetJueves(['ojkioj'])
              }}
              />
              <label>Jueves</label>
            </div>

            <div class="ui checkbox">
              <input type="checkbox"
              name="viernes"
              onChange={()=>{
                SetViernes(['ojkioj'])
              }}
              />
              <label>Viernes</label>
            </div>
            <div class="ui checkbox">
              <input type="checkbox"
              name="sabado"
              onChange={()=>{
                SetSabado(['ojkioj'])
              }}
              />
              <label>Sabado</label>
            </div>
            <div class="ui checkbox">
              <input type="checkbox"
              name="domingo"
              onChange={()=>{
                SetDomingo(['ojkioj'])
              }}
              />
              <label>Domingo</label>
            </div>
            {console.log(lunes.length)}
            


            {lunes.length>0?
            <div>
            <br/>
            <br/>
            <hr/>
            <h3>Lunes</h3>
            {showInputs('lunes', SetLunes, lunes)} 
            </div>:null
            } 

            {martes.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Martes</h3>
            {showInputs('martes', SetMartes, martes)}  
            </div>:null
            } 

            {miercoles.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Miercoles</h3>
           {showInputs('miercoles', SetMiercoles, miercoles)}
           </div>:null
            } 

            {jueves.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Jueves</h3>
            {showInputs('jueves', SetJueves, jueves)} 
            </div>:null
            } 

            {viernes.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Viernes</h3>
            {showInputs('viernes', SetViernes, viernes)} 
            </div>:null
            } 

          
            {sabado.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Sabado</h3>
            {showInputs('sabado', SetSabado, sabado)}
            </div>:null
            } 

            {domingo.length>0?
            <div>
             <br/>
             <br/>
             <hr/>
             <h3>Domingo</h3>
            {showInputs('domingo', SetDomingo, domingo)}
            </div>:null
            } 
            

         
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </div>
  );
}
