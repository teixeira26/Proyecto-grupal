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
import { addDays, getDay} from 'date-fns';
import Swal from "sweetalert2";

import axios from "axios";
import * as yup from "yup";

export default function BookingLodging() {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;
    const [myInfo, setMyinfo] = useState();
    const [bookingDay, setBookingDays] = useState([])
    const [bookingRealDays, setBookingRealDays] = useState([])
    const [ableDays, setAbleDays] = useState();
    const navigate = useNavigate()



    useEffect(()=>{
      
        axios.get('http://localhost:3001/providers?filter=&order=ASC').then(info=>{
            let data = info.data.find(x=>x.email === providerEmail);
            formik.values.providerName = data.name + ' ' + data.lastName
            formik.values.price = data.price
            let arr = [];
            for(let propiedad in data.schedule){
                if(data.schedule[propiedad]) arr.push(propiedad)
            }
            setAbleDays(arr)
            console.log(formik.values.price)
        })
        
    }, [providerEmail])

    // useEffect(()=>{
    //     dispatch(getProviderById(providerEmail))
    // }, [dispatch])
    // const provider = useSelector(state => state.providers)
    // console.log("PRECIO",provider.price)
    // console.log("PROVIDER", provider)


    const formik = useFormik({
        initialValues: {
            date:{
                day:'',
                hour:'',
                realDate:''
            },
            petName:'',
            eventType:'hospedaje',
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
            console.log(ableDays);
            console.log(bookingDay);
            for (let x = 0; x < bookingDay.length; x++) {
                console.log('soy la x', bookingDay[x])
                console.log('soy la respuesta del if',ableDays.includes(bookingDay[x]))
                if (ableDays.includes(bookingDay[x])) {}
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Intentaste reservar un día no disponible.',
                    })
                    navigate(`/reservar-hospedaje/${providerEmail}`)
                }}
            for (let x = 0; x < bookingDay.length; x++) {
                formData = {
                  ...formData,
                  date: {
                    day: bookingDay[x],
                    realDate:bookingRealDays[x],
                  },
                };
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
          
           
            
            dispatch(getEvents());
        }
    });

    useEffect(()=>{
        if(user){
        axios.get('http://localhost:3001/owners').then(x=>{
            let miInfo = x.data.find(y=>y.email === user.email);
            setMyinfo(miInfo)
        })
    }
    }, [user])


    // mapear un arreglo que tenga un objeto por cada mascota registrada en owner
    // console.log(providerEmail);
   const [petOptions, setPetOptions] = useState([])
    useEffect(()=>{
        var petOptions = [];
        console.log('okwjejwijwije', myInfo)
        if(myInfo && myInfo.pets){
        myInfo.pets.forEach(x=>petOptions.push({key:x.name, value:x.name, text:x.name}))}
        setPetOptions(petOptions)
    }, [myInfo])

    // console.log(Date)

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const linkedListWeek = {lunes:{name:'lunes', next:'martes', value:0,}, martes:{name:'martes',next:'miercoles', value:1, }, miercoles:{name:'miercoles',next:'jueves',value:2, }, jueves:{name:'jueves',next:"viernes", value:3, }, viernes:{name:'viernes',next:"sabado", value:4,},sabado:{name:'sabado',next:"domingo", value:4, },domingo:{name:'domingo',next:"lunes", value:6, } }

   
    
    function convert(day){
        switch (day) {
            case 'mon':
                return 'lunes'
            case 'tue':
                return 'martes'
            case 'wed':
                return 'miercoles'
            case 'thu':
                return 'jueves'
            case 'fri':
                return 'viernes'
            case 'sat':
                return 'sabado'
            case 'sun':
                return 'domingo'
            default:
                break;
        }
    }

    const recursiveWekend = (initialDay, finalDay)=>{
        console.log('INITIAL DATE', initialDay, 'final date', finalDay)
        if(!finalDay) return initialDay
        if(linkedListWeek[initialDay].name === linkedListWeek[finalDay].name) {
            console.log(linkedListWeek[finalDay])
            return linkedListWeek[finalDay].name
        };
            console.log(linkedListWeek[initialDay])
        return `${linkedListWeek[initialDay].name} ` + `${recursiveWekend(linkedListWeek[initialDay].next, finalDay)}`
    }        
    function sumarDias(fecha, dias){
        console.log('fecha: ', fecha, 'dias: ', dias)
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      }
    const recursiveDays = (initialDay, finalDay, initialDate)=>{
        if(!finalDay) return initialDate
        if(linkedListWeek[initialDay].name === linkedListWeek[finalDay].name) {
            console.log('final',initialDate)
            return initialDate
        };
            console.log(initialDate)
        return `${initialDate} ` + `${recursiveDays(linkedListWeek[initialDay].next, finalDay, initialDate+1)}`
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
                        onChange={(dates)=>{
                            console.log(dates)
                            setStartDate(dates[0])
                            let initialDay = convert(dates[0].toString().split(' ')[0].toLowerCase())
                            console.log(initialDay)
                            setEndDate(dates[1])
                             let finalDay = dates[1]?convert(dates[1].toString().split(' ')[0].toLowerCase()):null
                             console.log(finalDay)
                            let bookingDays = recursiveWekend(initialDay, finalDay).split(' ');
 
                            let initialDate = parseInt(dates[0].toString().split(' ')[2])
                            let initialRealDate = new Date().toString().split(' ')[2]
                            console.log(initialDate)
                            console.log(recursiveDays(initialDay, finalDay, initialDate).toString().split(' '))
                            let realDays = recursiveDays(initialDay, finalDay, initialDate).toString().split(' ').map(x=>sumarDias(new Date(),x-initialRealDate));
                            setBookingRealDays(realDays.map(x=>{
                                return x.toLocaleString().split(' ')[0]
                            }))
                            setBookingDays(bookingDays)
                             
                            }
                        }
                            // onChange()}}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        // filterDate={disableDates}
                        minDate={new Date()}
                        maxDate={addDays(new Date(), 6)}
                        showDisabledMonthNavigation
                        inline
                    />
                    <h2>días disponibles</h2>
                    {ableDays?ableDays.map(x=><p>{x}</p>):null}
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