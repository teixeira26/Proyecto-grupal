import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FieldArray, useFormik } from "formik";
// import * as yup from "yup";
import { getEvents, postEvent, getPets, getProviderById } from "../../redux/actions/ownProvActions";
import { Form, Button } from "semantic-ui-react";
import inContainer from '../GlobalCss/InContainer.module.css';
import NavBar from "../NavBar/NavBarShop";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay } from 'date-fns';
import Swal from "sweetalert2";

import axios from "axios";
import * as yup from "yup";

export default function BookingLodging() {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;
    const [myInfo, setMyinfo] = useState();
    const [bookingDays, setBookingDays] = useState([])
    const [bookingRealDays, setBookingRealDays] = useState([])
    const [ableDays, setAbleDays] = useState();
    const navigate = useNavigate()



    useEffect(() => {

        axios.get('http://localhost:3001/providers?filter=&order=ASC').then(info => {
            let data = info.data.find(x => x.email === providerEmail);
            formik.values.providerName = data.name + ' ' + data.lastName
            formik.values.price = data.price
            setAbleDays(data.schedule)
        })
    }, [providerEmail])

    const formik = useFormik({
        initialValues: {
            date: {
                day: ''
            },
            petName: '',
            eventType: 'hospedaje',
            comments: '',
            payment: 'pending',
            ownerEmail: user.email,
            providerEmail: providerEmail,
            ownerName: user.name,
            providerName: '',
            price: ''
        },
        validationSchema: yup.object({
            petName: yup.string().required('Debes seleccionar una mascota'),
        }),
        onSubmit: async (formData) => {
            console.log(ableDays);
            console.log(bookingDays);
            for (let x = 0; x < bookingDays.length; x++) {
                console.log('soy la x', bookingDays[x])
                if (ableDays.includes(bookingDays[x])) { }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Intentaste reservar un día no disponible.',
                    })
                    navigate(`/reservar-hospedaje/${providerEmail}`)
                }
            }


            Swal.fire({
                title: 'Estás seguro que las informaciones sobre este evento son correctas ?',
                showDenyButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    for (let x = 0; x < bookingDays.length; x++) {
                        formData = {
                            ...formData,
                            date: {
                                day: bookingDays[x],
                            },
                        };
                        await axios.post("http://localhost:3001/events", formData);
                    }
                    axios.post('http://localhost:3001/mailer/', { email: user.email, subject: "Confirmación de reserva Yum Paw", text: "Recién hiciste una reserva en nuestra página, te felicitamos :)" })
                    console.log(formData);
                    Swal.fire('Evento confirmado!', '', 'success')
                    navigate('/confirmar-reserva')
                } else if (result.isDenied) {
                    Swal.fire('Los cambios no fueron guardados', '', 'info')
                }
            })





            dispatch(getEvents());
        }
    });

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:3001/owners').then(x => {
                let miInfo = x.data.find(y => y.email === user.email);
                setMyinfo(miInfo)
            })
        }
    }, [user]);

    const [petOptions, setPetOptions] = useState([]);
    useEffect(() => {
        var petOptions = [];
        console.log('okwjejwijwije', myInfo)
        if (myInfo && myInfo.pets) {
            myInfo.pets.forEach(x => petOptions.push({ key: x.name, value: x.name, text: x.name }))
        }
        setPetOptions(petOptions)
    }, [myInfo]);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);




    const restarFechas = function (f1, f2) {
        var aFecha1 = f1.split('/');
        var aFecha2 = f2.split('/');
        var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
        var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
        var dif = fFecha2 - fFecha1;
        var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
        return dias;
    }


    const onChangeDatePicker = (fecha) => {
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



    function sumarDias(fecha, dias) {
        console.log('fecha: ', fecha, 'dias: ', dias)
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
    }



    // const disableDates = (date) => {
    //     if(ableDays){
    //     let schedule = ableDays.schedule;
    //     if(schedule.lunes === false)
    //     console.log('scheduleeeeeee', schedule)}    
    //     const day = getDay(date);
    //     console.log('dayyyyyyy',day)
    //     return day !== 1;
    //   };

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
                        {/* moment().format('MMMM Do YYYY, h:mm:ss a'); */}
                    </Form.Dropdown>
                    <label htmlFor="">Elige un rango de fecha para el hospedaje de tu mascota</label>
                    <DatePicker
                        selected={startDate}
                        onChange={onChangeDatePicker}
                        // onChange()}}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        // filterDate={disableDates}
                        includeDates={ableDays && ableDays.map(x => {
                            const dayTemp = x.split('/')[0]
                            const monthTemp = x.split('/')[1]
                            let newDate = x.split('/');
                            newDate[0] = monthTemp;
                            newDate[1] = dayTemp
                            return (addDays(new Date(newDate.join('/')), 0))
                        })}//'06/31/2022'
                        inline
                    />
                    <h2>días disponibles</h2>
                    {/* {ableDays?ableDays.map(x=><p>{x}</p>):null} */}
                    <label htmlFor="">Comentarios adicionales</label>
                    <textarea
                        onChange={(e) => {
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