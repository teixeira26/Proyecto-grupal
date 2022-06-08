import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import inContainer from "../GlobalCss/InContainer.module.css";
import style from './DetailProviderCard.module.css'
import axios from "axios";

export default function DetailProviderCard({name, lastName, profilePicture, address, email, service, description, city, state, price}) {
    // console.log(email)
    // console.log(city)
    // console.log(state)
    const {user} = useAuth0()
    const [stars, setStars] = useState(5)
    useEffect(()=>{
        axios.get('http://localhost:3001/reviews').then(x=>{
            let providerEvaluations = x.data.filter(x=>x.provider.email === email);
            providerEvaluations = providerEvaluations.map(x=> x.review)
            let numberEvaluations = providerEvaluations.length
            providerEvaluations = providerEvaluations.reduce((x,y)=>x+y, 0)
            setStars(providerEvaluations/numberEvaluations);
        })
    },[])
    return(
        <>
            <section className={inContainer.container}>
                <div className={style.topinfo}>
                    <img className={style.detailImg} src={profilePicture} alt="profile img" />
                    <div className={style.data}>
                        <h1>{name} {lastName}</h1>
                        <p>{service}</p>
                        <p>{address}</p>
                    </div>
                </div>
                <div>
                    <p className={style.star}>{stars>=1?'★':'☆'}</p>
                    <p className={style.star}>{stars>=2?'★':'☆'}</p>
                    <p className={style.star}>{stars>=3?'★':'☆'}</p>
                    <p className={style.star}>{stars>=4?'★':'☆'}</p>
                    <p className={style.star}>{stars===5?'★':'☆'}</p>

                </div>
                <div className={style.description}>
                    <h2>Sobre {name}</h2>
                    <p>{description}</p>
                    <span>Costo por {service}: <strong>${price}</strong></span>
                </div>
                
                <div className={style.contact}>
                    <NavLink to={`/chat/${email}/${user.email}`}><button>Contactarme con {name}</button></NavLink>
                    <NavLink to={`/review/${email}`}><button>Calificar a {name}</button></NavLink>
                </div>
                
                {/* <div>
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
                </div> */}
            </section>
        </>
    )
}