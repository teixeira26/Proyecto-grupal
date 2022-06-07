import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useFormik } from "formik";
import { Form, Button } from "semantic-ui-react";
import inContainer from '../GlobalCss/InContainer.module.css';

import NavBar from "../NavBar/NavBarShop";

export default function Booking() {
    const { user } = useAuth0();
    const providerEmail = useParams().providerEmail;
    const ownerEmail = useParams().ownerEmail;

    const formik = useFormik({
        initialValues: {
            email: '',
        }
    });

    const petOptions = [
        { key: "mascota1", value: "mascota 1", text: "Mascota 1" }, { key: "mascota2", value: "mascota 2", text: "Mascota 2" }
    ];

    return (
        <>
            <NavBar />
            <div className={inContainer.container}>
                <Form>
                    <h2>Tu reserva</h2>
                    <label htmlFor="">Nombre</label>
                    <Form.Input type="text" readOnly name="name" value='Jane Doe' onChange={formik.handleChange} />
                    <label htmlFor="">Mascota</label>
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
                    ></Form.Dropdown>
                    <label htmlFor="">Seleccionar fecha</label>
                    <Form.Select></Form.Select>
                    <label htmlFor="">Seleccionar horario</label>
                    <Form.Select></Form.Select>
                    <Link to={`/chat/${providerEmail}/${ownerEmail}`}><Button>Cancelar</Button></Link>
                    <Link to='/confirmar-reserva'><Button type="submit">Continuar</Button></Link>
                </Form>
            </div>
        </>
    )
};