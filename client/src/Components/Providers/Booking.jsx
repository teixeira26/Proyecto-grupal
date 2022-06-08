import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
// import * as yup from "yup";
import { getEvents, postEvent } from "../../redux/actions/ownProvActions";
import { Form, Button } from "semantic-ui-react";
import inContainer from '../GlobalCss/InContainer.module.css';
import NavBar from "../NavBar/NavBarShop";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Booking() {
    const dispatch = useDispatch();
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;

    const formik = useFormik({
        initialValues: {
            ownerEmail: user.email,
            petName: '',
            date: '',
            eventType: ''
        },
        onSubmit: async (formData) => {
            await dispatch(postEvent(formData.userEmail, formData));
            dispatch(getEvents());
        }
    });

    // mapear un arreglo que tenga un objeto por cada mascota registrada en owner
    console.log(providerEmail);
    const petOptions = [
        { key: "mascota1", value: "mascota 1", text: "Mascota 1" }, { key: "mascota2", value: "mascota 2", text: "Mascota 2" }
    ];

    console.log(Date)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <>
            <NavBar />
            <div className={inContainer.container}>
                <Form>
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
                            e.target.name = "size"
                            console.log(e.target.value)
                            formik.handleChange(e)
                        }}
                        selection={true}
                        error={formik.errors.size}
                    >

                    moment().format('MMMM Do YYYY, h:mm:ss a');

                    </Form.Dropdown>
                    <label htmlFor="">Elige un rango de fecha para el hospedaje de tu mascota</label>
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        showDisabledMonthNavigation
                    />

                    <label htmlFor="">Comentarios adicionales</label>
                    <Form.TextArea></Form.TextArea>

                    <Link to={`/chat/${providerEmail}/${ownerEmail}`}><Button>Cancelar</Button></Link>
                    <Link to='/confirmar-reserva'><Button type="submit">Continuar con el pago</Button></Link>
                </Form>
            </div>
        </>
    )
};