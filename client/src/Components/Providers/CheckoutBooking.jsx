import React from "react";
import { Link, useParams } from "react-router-dom";
import inContainer from '../GlobalCss/InContainer.module.css';

import NavBar from "../NavBar/NavBarShop";

export default function CheckoutBooking() {

    return (
        <>
            <NavBar />
            <div className={inContainer.container}>
                <h2>Checkout Page</h2>
            </div>
        </>
    )
};