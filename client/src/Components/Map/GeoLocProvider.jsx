import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GeoLocProvider = () => {

    const [state, setState] = useState({
        latitude: 0,
        longitude: 0
    });

    // Cuando se monta el componente, obtenemos las coords actuales.
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log('getCurrentPosition: ', position.coords.latitude, position.coords.longitude);
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            function (error) {
                console.log(error);
            },
            {
                enableHighAccuracy: true // Cada vez que pueda extraerá desde el GPS info extra.
            }
        )
    }, []);

    console.log('state: ', state);

    return (
        <div>
            <h2>Geo Loc Provider</h2>
            <p>Latitud no hardcodeada:{state.latitude}</p>
            <p>Longitud no hardcodeada:{state.longitude}</p>
            <Link
                to={"/mapview"}
                state={{ latitude: state.latitude, longitude: state.longitude }}
            >
                Ver mi ubicación
            </Link>
        </div>
    )
};

export default GeoLocProvider;