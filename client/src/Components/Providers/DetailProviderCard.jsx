import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import inContainer from "../GlobalCss/InContainer.module.css";
import style from './DetailProviderCard.module.css'
import axios from "axios";
import { Circle, Map, TileLayer } from "react-leaflet"; // El componente Map encapsula la lógica del mapa. TileLayer lo muestra.
import CircleMarker from "../Map/CircleMarker";

export default function DetailProviderCard({name, lastName, profilePicture, address, email, service, description, city, state, price, latitude, longitude, schedule}) {
    // console.log(email)
    // console.log(city)
    // console.log(state)
    console.log(latitude, longitude)
    const {user} = useAuth0()
    const [stars, setStars] = useState(0)
    const [quantityReviews, setquantityReviews] = useState(0)
    const [reviews, setReviews] = useState()
    useEffect(()=>{
        axios.get('http://localhost:3001/reviews').then(x=>{
            let providerEvaluations = x.data.filter(x=>x.provider.email === email);
            setReviews(providerEvaluations);
            console.log(providerEvaluations)
            providerEvaluations = providerEvaluations.map(x=> x.review)
            let numberEvaluations = providerEvaluations.length
            providerEvaluations = providerEvaluations.reduce((x,y)=>x+y, 0)
            setStars(providerEvaluations/numberEvaluations);
            if(providerEvaluations)setquantityReviews(numberEvaluations)
        })
    },[])
    return(
        <>
            <Map
            center={{lat: latitude,
            lng: longitude}}
            zoom={14}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Markers data={currentLocationProvider} /> */}
            <CircleMarker data={{lat: latitude,
            lng: longitude}} />
            </Map>
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
                <p>({quantityReviews})</p>
                <div className={style.description}>
                    <h2>Sobre {name}</h2>
                    <p>{description}</p>
                    <span>Costo por {service}: <strong>${price}</strong></span>
                </div>
                <div>
                    <h3>Disponibilidad de {name}</h3>
                    {Object.keys(schedule).map((key) => {
                    return [key, schedule[key]]
                })}
                </div>
                <div className={style.contact}>
                    <NavLink to={`/chat/${email}/${user.email}`}><button>Contactarme con {name}</button></NavLink>
                    {service == 'hospedaje'?<NavLink to={`/reservar-hospedaje/${email}`}><button>Reservar servicio</button></NavLink>:null}
                    {service == 'paseo'?<NavLink to={`/reservar-paseo/${email}`}><button>Reservar servicio</button></NavLink>:null}
                    <NavLink to={`/review/${email}`}><button>Calificar a {name}</button></NavLink>
                </div>
                <h2>Calificaciones</h2>
                <div>
                    {reviews&&reviews.map((x,y)=>{
                        if(y<5){
                            return(
                                <div key={y}>
                                <hr/>  
                                <div>
                                <p className={style.star}>{x.review>=1?'★':'☆'}</p>
                                <p className={style.star}>{x.review>=2?'★':'☆'}</p>
                                <p className={style.star}>{x.review>=3?'★':'☆'}</p>
                                <p className={style.star}>{x.review>=4?'★':'☆'}</p>
                                <p className={style.star}>{x.review===5?'★':'☆'}</p>
                                </div>
                                <h4 style={{display:'inline'}}>{x.owner.name} {x.owner.lastName}:</h4>
                                <p style={{display:"inline", color:'blue'}}> {x.message}</p>
                            </div>
                            )
                        }
                    })}
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
};