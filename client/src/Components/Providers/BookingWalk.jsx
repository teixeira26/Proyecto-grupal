import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FieldArray, useFormik } from "formik";
// import * as yup from "yup";
import { getEvents, postEvent, getPets } from "../../redux/actions/ownProvActions";
import { Form, Button, FormField } from "semantic-ui-react";
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
    const [bookingDay, setBookingDays] = useState([])
    const [schedule, setSchedule] = useState();
    const [petOptions, setPetOptions] = useState([]);
    const [providerName, setProviderName] = useState();
    const navigate = useNavigate()


    useEffect(()=>{
      
        axios.get('http://localhost:3001/providers?filter=&order=ASC').then(info=>{
            let data = info.data.find(x=>x.email === providerEmail);
            formik.values.providerName = data.name + ' ' + data.lastName
            formik.values.price = data.price
            setSchedule(data.schedule)
            console.log("PRECIOOOO", formik.values.price)
        })
        
    }, [providerEmail])


    useEffect(()=>{
        if(user){
        axios.get('http://localhost:3001/owners').then(x=>{
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
                realDate:'02/10/2022',   
            },
            petName:'',
            eventType:'paseo',
            comments:'',
            payment:'pending',
            ownerEmail:user.email,
            providerEmail:providerEmail,
            ownerName:user.name,
            providerName: '',
            price: ''
        },
        validationSchema: yup.object({
            petName: yup.string().required('Debes seleccionar una mascota'),
          }),
        onSubmit: async (formData) => {
            Swal.fire({
                title: 'Estás seguro que las informaciones sobre este evento son correctas ?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await axios.post("http://localhost:3001/events", formData);
                    axios.post('http://localhost:3001/mailer/', {email:user.email, subject:"Confirmación de reserva Yum Paw", text:"Recién hiciste una reserva en nuestra página, te felicitamos :)"})
                    console.log(formData);
                    Swal.fire('Evento confirmado!', '', 'success')
                    navigate('/confirmar-reserva')
                } else if (result.isDenied) {
                  Swal.fire('Los cambios no fueron guardados', '', 'info')
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
                        placeholder="Elige una de tus mascotas"
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
                    <label htmlFor="">Elige un rango de fecha para el hospedaje de tu mascota</label>
                   
                    <h2>horas disponibles</h2>
                    {schedule&& 
                            <div>
                            <br/>
                            <br/>
                            {console.log(schedule)}
                            <div style={{display:'block'}}><h3>lunes</h3>{schedule.lunes.map(x=>{
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
                            <div><h3>martes</h3>{schedule.martes.map(x=>{
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
                            <div><h3>miércoles</h3>{schedule.miercoles.map(x=>{
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
                            <div><h3>jueves</h3>{schedule.jueves.map(x=>{
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
                            <div><h3>viernes</h3>{schedule.viernes.map(x=>{
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
                            <div><h3>sábado</h3>{schedule.sabado.map(x=>{
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
                            <div><h3>domingo</h3>{schedule.domingo.map(x=>{
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

                    <Link to={`/chat/${providerEmail}/${ownerEmail}`}><Button>Cancelar</Button></Link>
                    <button>Continuar con el pago</button>

                </Form>
            </div>
        </>
    )
};