import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function DetailProviderCard({name, lastName, profilePicture, address, email, service, description, city, state}) {
    console.log(email)
    console.log(city)
    console.log(state)
    const {user} = useAuth0()

    return(
        <>
            <section>
                <img src={profilePicture} alt="" />
                <div>
                    <div>
                        <h1>{name} {lastName}</h1>
                        <span>Rating</span>
                    </div>
                    <h3>{service}</h3>
                    <h4>{address}</h4>
                </div>
                <div>
                    <h2>Sobre {name}</h2>
                    <p>{description}</p>
                    <NavLink to={`/chat/${email}/${user.email}`}><button>Contactarme con Name</button></NavLink>
                </div>
                <div>
                    <h2>Comentarios recibidos por {name}</h2>
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