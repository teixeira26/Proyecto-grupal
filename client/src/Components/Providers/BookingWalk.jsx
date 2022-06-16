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
import { addDays, getDay } from 'date-fns';
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [time, setTime] = useState(null);

  const navigate = useNavigate()


  useEffect(() => {

    axios.get('http://localhost:3001/providers?filter=&order=ASC').then(info => {
      let data = info.data.find(x => x.email === providerEmail);
      formik.values.providerName = data.name + ' ' + data.lastName
      formik.values.price = data.price
      setSchedule(data.schedule)
      console.log("PRECIOOOO", formik.values.price)
    })

  }, [providerEmail])


  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3001/owners').then(x => {
        let miInfo = x.data.find(y => y.email === user.email);
        setMyinfo(miInfo)
      })
    }
  }, [user])



  useEffect(() => {
    var petOptions = [];
    if (myInfo && myInfo.pets) {
      myInfo.pets.forEach(x => petOptions.push({ key: x.name, value: x.name, text: x.name }))
    }
    setPetOptions(petOptions)
  }, [myInfo])

  const formik = useFormik({
    initialValues: {
      date: {
        day: '',
        hour: '',
        realDate: '02/10/2022',
      },
      petName: '',
      eventType: 'paseo',
      comments: '',
      payment: 'pending',
      ownerEmail: user.email,
      providerEmail: providerEmail,
      ownerName: user.name,
      providerName: '',
      price: ''
    },
    validationSchema: yup.object({
      petName: yup.string().required('Tenés que elegir una mascota'),
    }),
    onSubmit: async (formData) => {
      Swal.fire({
        title: '¿Estás seguro que querés confirmar esta reserva?',
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: 'Confirmar'
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await axios.post("http://localhost:3001/events", formData);
          axios.post('http://localhost:3001/mailer/', { email: user.email, subject: "Confirmación de reserva Yum Paw", text: "Recién hiciste una reserva en nuestra página, te felicitamos :)" })
          console.log(formData);
          Swal.fire('¡La reserva fue confirmada con éxito!', '', 'success')
          navigate('/confirmar-reserva')
        } else if (result.isDenied) {
          Swal.fire('La reserva no fue confirmada.', '', 'info')
        }
      })
    }
  });

  const restarFechas = function (f1, f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2].slice(0, 4), aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2].slice(0, 4), aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
  }

  function sumarDias(fecha, dias) {
    console.log('fecha: ', fecha, 'dias: ', dias)
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  const onChangeDatePickerTime = (time) => {
    console.log(time);
    console.log(bookingDay)
    let newBookingDay = bookingDay.map(x => { return { hour: time.toString().split(' ')[4], schedule: bookingDay } })
    console.log(newBookingDay)
    setTime(time)
  }
  const onChangeDatePicker = (fecha) => {
    console.log(fecha)
    setStartDate(fecha[0]);
    console.log('Fecha inicial: ', fecha[0].toLocaleString().split(' ')[0])

    setEndDate(fecha[1] ? fecha[1] : null)
    console.log('fecha final: ', fecha[1] ? fecha[1].toLocaleString().split(' ')[0] : null)

    if (fecha[0] && fecha[1]) {
      var fechasSeleccionadas = [];
      const diasTranscorridos = restarFechas(fecha[0].toLocaleString().split(' ')[0], fecha[1].toLocaleString().split(' ')[0]);
      const fechaInicial = restarFechas(new Date().toLocaleString().split(' ')[0], fecha[0].toLocaleString().split(' ')[0])
      console.log('diferencia entre la fecha inicial y la fecha actual', fechaInicial)
      console.log('dias transcorridos entre la fecha final y inicial: ', diasTranscorridos);
      for (var x = 0; x < diasTranscorridos + 1; x++) {
        console.log('x : ', fechaInicial + x)
        fechasSeleccionadas.push(sumarDias(new Date(), fechaInicial + x).toLocaleString().split(' ')[0])
      }
    }
    console.log(fechasSeleccionadas);
    if (fechasSeleccionadas) setBookingDays(fechasSeleccionadas)
  }

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
          <label htmlFor="">Elegí un horario para el paseo de tu mascota</label>
          <h2>horas disponibles</h2>
          <DatePicker
            selected={startDate}
            onChange={onChangeDatePicker}
            // onChange()}}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            showDisabledMonthNavigation
          />

          <DatePicker
            selected={time}
            onChange={onChangeDatePickerTime}
            showTimeSelectOnly
            showTimeSelect
            inline
            timeIntervals={60}
          />
          {/* {schedule&& 
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
                        } */}
          <label htmlFor="">Comentarios adicionales</label>
          <textarea
            onChange={(e) => {
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
