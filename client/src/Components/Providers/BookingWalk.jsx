import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FieldArray, useFormik } from "formik";
// import * as yup from "yup";
import { getEvents, postEvent, getPets } from "../../redux/actions/ownProvActions";
import { Form, Button } from "semantic-ui-react";
import inContainer from '../GlobalCss/InContainer.module.css';
import NavBar from "../NavBar/NavBarShop";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay} from 'date-fns';
import Swal from "sweetalert2";

import axios from "axios";
import * as yup from "yup";

export default function BookingWalk() {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;
    const [myInfo, setMyinfo] = useState();
    const [schedule, setSchedule] = useState();
    const [petOptions, setPetOptions] = useState([]);
    const [maxId, setMaxId] = useState(0)
    const navigate = useNavigate()
    
    
    useEffect(() => {
      dispatch(getEvents())
  }, [])

  const events = useSelector(state => state.events)

    useEffect(()=>{
      if(providerEmail){
        axios.get('https://proyecto-grupal.herokuapp.com/providers?filter=&order=ASC').then(info=>{
            let data = info.data.find(x=>x.email === providerEmail);
            formik.values.price = data.price*4
            formik.values.providerName = data.name + ' ' + data.lastName
            if (data) {
              data = {...data, schedule:data.schedule.map(x=>JSON.parse(x))}
              console.log(data.schedule)
              let lunesarr = data.schedule.find(x=>x['lunes'])
              let martesarr = data.schedule.find(x=>x['martes'])
              let miercolesarr = data.schedule.find(x=>x['miercoles'])
              let juevesarr = data.schedule.find(x=>x['jueves'])
              let viernesarr = data.schedule.find(x=>x['viernes'])
              let sabadoarr = data.schedule.find(x=>x['sabado'])
              let domingoarr= data.schedule.find(x=>x['domingo']);
              let newSchedule = [lunesarr, martesarr, miercolesarr, juevesarr, viernesarr, sabadoarr, domingoarr]
              console.log(newSchedule)
              setSchedule(newSchedule)
              
            }

            
        })
      }
    }, [providerEmail])

    useEffect(() => {
      if (events.length) {
          events.forEach(ev => {
              console.log('ev', ev)
              if (ev.numberOfBooking > maxId) setMaxId(ev.numberOfBooking + 1)
              else setMaxId(maxId + 1)
          })
      }
  }, [events])
    useEffect(()=>{
        if(user){
        axios.get('https://proyecto-grupal.herokuapp.com/owners').then(x=>{
            let miInfo = x.data.find(y=>y.email === user.email);
            setMyinfo(miInfo)
        })
    }
    }, [user])

    useEffect(()=>{
        var petOptions = [];
        if(myInfo && myInfo.pets){
        myInfo.pets.forEach(x=>petOptions.push({key:x.name, value:x.name, text:x.name}))}
        setPetOptions(petOptions)
    }, [myInfo])

    const formik = useFormik({
        initialValues: {
            date:{
                day:'',
                hour:'',
            },
            petName:'',
            eventType:'paseo',
            comments:'',
            payment:'pending',
            ownerEmail:user.email,
            providerEmail:providerEmail,
            ownerName:user.name,
            providerName: '',
            price:0,
            numberOfBooking:'',
        },
        validationSchema: yup.object({
            petName: yup.string().required('Tenés que seleccionar una mascota'),
          }),
        onSubmit: async (formData) => {
              formData = {
                ...formData,
                numberOfBooking: maxId
            };
            Swal.fire({
                title: '¿Estás seguro que querés confirmar este paseo?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await axios.post("https://proyecto-grupal.herokuapp.com/events", formData);
                    axios.post('https://proyecto-grupal.herokuapp.com/mailer/', {email:user.email, subject:"Confirmación de reserva Yum Paw", text:"Recién hiciste una reserva en nuestra página, te felicitamos :)"})
                    console.log(formData);
                    Swal.fire('¡El paseo fue confirmado con éxito!', '', 'success')
                    navigate('/confirmar-reserva')
                } else if (result.isDenied) {
                  Swal.fire('El paseo no fue confirmado.', '', 'info')
                }
              })
        }
    });

    return (
        <>
            <NavBar />
            <div className={inContainer.container}>
                <Form onSubmit={formik.handleSubmit}>
                    <h2>Tu reserva</h2>
                    <label htmlFor="">Tu nombre</label>
                    <Form.Input type="text" readOnly name="name" value={user.name} onChange={formik.handleChange} />
                    <label htmlFor="">Tu mascota</label>
                    <Form.Dropdown
                        placeholder="Elegí una de tus mascotas"
                        options={petOptions}
                        onChange={(e) => {
                            console.log(e.target.firstChild.textContent)
                            e.target.value = e.target.firstChild.textContent
                            e.target.name = "petName"
                            formik.values.petName = e.target.value;
                            console.log(formik.values)
                            formik.handleChange(e)
                        }}
                        selection={true}
                        error={formik.errors.petName}
                    >

                    </Form.Dropdown>
                    <label htmlFor="">Elegí una fecha para el paseo semanal de tu mascota</label>
                    <h2>Horarios disponibles</h2>
                    {console.log(schedule)}
                    {schedule&& 
                            <div>
                            <br/>
                            <br/>
                            {console.log(schedule)}
                            <div style={{display:'block'}}><h3>lunes</h3>{schedule[0] && schedule[0].length&&schedule[0].lunes.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='lunes' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>martes</h3>{schedule[1]  && schedule[1].martes.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='martes' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>miércoles</h3>{schedule[2]  && schedule[2].miercoles.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='miercoles' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>jueves</h3>{schedule[3] && schedule[3].jueves.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='jueves' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>viernes</h3>{schedule[4]  && schedule[4].viernes.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='viernes' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>sábado</h3>{schedule[5]  && schedule[5].sabado.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='sabado' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            <div><h3>domingo</h3>{ schedule[6]  && schedule[6].domingo.map(x=>{
                            return (
                            <div>
                                <div class="ui radio checkbox">
                                <input type="radio" name="radio" day='domingo' hour={x} onChange={(e)=>{
                                    formik.values.date.day = e.target.attributes[2].nodeValue;
                                    formik.values.date.hour = e.target.attributes[3].nodeValue;
                                }}/>
                                <label>{x}</label>
                                </div>
                            </div>
                            )
                            })}</div>
                            </div>
                        }
                    <label htmlFor="">Comentarios adicionales</label>
                    <textarea
                    onChange={(e)=>{
                        formik.values.comments = e.target.value
                        }}
                    ></textarea>
                    <Link to={`/chat/${providerEmail}/${ownerEmail}`}><button className="secondaryButton">Cancelar</button></Link>
                    <button className="primaryButton">Continuar con el pago</button>
                </Form>
            </div>
        </>
    )
};
