import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import inContainer from "../GlobalCss/InContainer.module.css";
import style from './DetailProviderCard.module.css'
import axios from "axios";
import { Map, TileLayer } from "react-leaflet"; // El componente Map encapsula la lógica del mapa. TileLayer lo muestra.
import CircleMarker from "../Map/CircleMarker";

export default function DetailProviderCard({ name, lastName, profilePicture, address, email, service, description, city, state, price, latitude, longitude, schedule }) {
    // console.log(email)
    // console.log(city)
    // console.log(state)
    console.log(latitude, longitude)
    const { user } = useAuth0()
    const [stars, setStars] = useState(0)
    const [quantityReviews, setquantityReviews] = useState(0)
    const [reviews, setReviews] = useState()
    const [providerInfo, setProviderInfo] = useState()
    useEffect(() => {
        axios.get('https://proyecto-grupal.herokuapp.com/reviews').then(x => {
            let providerEvaluations = x.data.filter(x => x.provider.email === email);
            setReviews(providerEvaluations);
            console.log(providerEvaluations)
            providerEvaluations = providerEvaluations.map(x => x.review)
            let numberEvaluations = providerEvaluations.length
            providerEvaluations = providerEvaluations.reduce((x, y) => x + y, 0)
            setStars(providerEvaluations / numberEvaluations);
            if (providerEvaluations) setquantityReviews(numberEvaluations)
        })
    }, [])

    useEffect(() => {
        if (user) {
            axios.get("https://proyecto-grupal.herokuapp.com/providers?filter=&order=ASC").then((x) => {
                const providerCheck = x.data.find((x) => x.email === email);
                console.log(providerCheck)
                setProviderInfo(providerCheck);
            })
        }
    }, [user])
    return (
        <>
            <section className={inContainer.container}>
                <div className={style.topinfo}>
                    <img className={style.detailImg} src={profilePicture} alt="foto de perfil del usuario" />
                    <div className={style.data}>
                        <div className={style.stars}>
                            <p className={style.star}>{stars >= 1 ? '★' : '☆'}</p>
                            <p className={style.star}>{stars >= 2 ? '★' : '☆'}</p>
                            <p className={style.star}>{stars >= 3 ? '★' : '☆'}</p>
                            <p className={style.star}>{stars >= 4 ? '★' : '☆'}</p>
                            <p className={style.star}>{stars === 5 ? '★' : '☆'}</p>
                            <p>({quantityReviews})</p>
                        </div>
                        <div className={style.divButton}>
                            <h1>{name} {lastName}</h1>
                            <Link to={`/chat/${email}/${user.email}`}><button className="primaryButton">Contactar</button></Link>
                        </div>
                        <p className={style.userService}>{service} por día: <strong>${price}</strong></p>
                    </div>
                </div>
                <div className={style.description}>
                    <h2 className={style.about}>Sobre {name}</h2>
                    <p className={style.paragraphDescription}>{description}</p>
                </div>
                <div className={style.sched}>
                    <div className={style.titleSchedule}>
                        <h2 className={style.about}>Chequeá su disponibilidad</h2>
                        {service == 'hospedaje' ? <Link to={`/reservar-hospedaje/${email}`}><button className="primaryButton">Reservar servicio</button></Link> : null}
                        {service == 'paseo' ? <Link to={`/reservar-paseo/${email}`}><button>Reservar servicio</button></Link> : null}
                    </div>
                    <div className={style.gridSchedule}>
                        {Object.keys(schedule).map((key) => {
                            return <p className={style.scheduleDate}>{[schedule[key]]}</p>
                        })}
                    </div>
                </div>
                {(providerInfo && providerInfo.service[0] === 'hospedaje') ?
                    <div className={style.sched}>
                        <h2 className={style.about}>Este es el hogar de {name}</h2>
                        <div className={style.housingGrid}>
                            {providerInfo.housingPhotos && providerInfo.housingPhotos.map((x, y) => {
                                return (
                                    <img className={style.housePhoto} src={x} key={y} alt={y}></img>
                                )
                            })}
                        </div>
                    </div>
                    : null}
                <div className={style.reviews}>
                    <div className={style.gridReview}>
                        <h2 className={style.about}>Reseñas que recibió</h2>
                        <Link to={`/resena/${email}`}><button className="primaryButton">Calificar</button></Link>
                    </div>
                    {reviews && reviews.map((x, y) => {
                        if (y < 5) {
                            return (
                                <div className={style.review} key={y}>
                                    <div className={style.stars}>
                                        <p className={style.star}>{x.review >= 1 ? '★' : '☆'}</p>
                                        <p className={style.star}>{x.review >= 2 ? '★' : '☆'}</p>
                                        <p className={style.star}>{x.review >= 3 ? '★' : '☆'}</p>
                                        <p className={style.star}>{x.review >= 4 ? '★' : '☆'}</p>
                                        <p className={style.star}>{x.review === 5 ? '★' : '☆'}</p>
                                    </div>
                                    <p className={style.comment}>"{x.message}"" - {x.owner.name} {x.owner.lastName}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className={style.sched}>
                    <h2 className={style.about}>Mirá el rango donde trabaja {name}</h2>
                    <Map className={style.map}
                        center={{
                            lat: latitude,
                            lng: longitude
                        }}
                        zoom={14}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {/* <Markers data={currentLocationProvider} /> */}
                        <CircleMarker data={{
                            lat: latitude,
                            lng: longitude
                        }} />
                    </Map>
                </div>
            </section>
        </>
    )
};