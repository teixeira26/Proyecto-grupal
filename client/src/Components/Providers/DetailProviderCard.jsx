import React, { useState } from "react";
import styles from './DetailProviderCard.module.css';
import NavBarRegistered from "../NavBar/NavBarRegistered";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function DetailProviderCard({name, profilePicture, email}) {
    console.log(email)
    const {user} = useAuth0()

    return(
        <>
            <section>
                <img src={profilePicture} alt="" />
                <div>
                    <div>
                        <h1>{name}</h1>
                        <span>Rating</span>
                    </div>
                    <h3>Role</h3>
                    <h4>Location - #Works</h4>
                </div>
                <div>
                    <h2>Sobre Name</h2>
                    <p>Descripcion</p>
                    <NavLink to={`/chat/${email}/${user.email}`}><button>Contactarme con Name</button></NavLink>
                </div>
                <div>
                    <h2>Comentarios recibidos por Name</h2>
                    <div>
                        <img src="" alt="ratePhoto" />
                        <div>
                            <h3>Name</h3>
                            <span>Rate</span>
                            <p>Comments</p>
                        </div>
                    </div>
                    <div>
                        <img src="" alt="ratePhoto" />
                        <div>
                            <h3>Name</h3>
                            <span>Rate</span>
                            <p>Comments</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}