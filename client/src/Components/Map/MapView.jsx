import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Circle, Map, TileLayer } from "react-leaflet"; // El componente Map encapsula la lógica del mapa. TileLayer lo muestra.
import 'leaflet/dist/leaflet.css'; // Importamos los estilos de leaflet para pintar el mapa.
import Markers from "./Markers";
import CircleMarker from "./CircleMarker";

const MapView = () => {

    const [state, setState] = useState({
        currentLocation: {
            lat: '-23.531994432597454',
            lng: '-46.63566517289605'
        },
        zoom: 14
    });

    const currentLocationProvider = state.currentLocation;
    console.log('state de GeoLocProvider: ', currentLocationProvider)

    const location = useLocation(); // Del Link de GeoLocProvider nos extraemos y lo utilizamos para trabajar con las coords.
    console.log('Location: ', location.state.latitude, location.state.longitude);

    // const navigate = useNavigate();

    useEffect(() => {
        if (location.state.latitude && location.state.longitude) {
            const currentLocation = {
                lat: location.state.latitude,
                lng: location.state.longitude
            }
            setState({ ...state, currentLocation })
            // navigate("../mapview", { state: {} }, { replace: true }); // Cuando se refresca la página vuelven las coords al estado inicial.
        }
    }, [])

    return (
        <Map
            center={state.currentLocation}
            zoom={state.zoom}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* <Markers data={currentLocationProvider} /> */}
            <CircleMarker data={currentLocationProvider} />
        </Map>
    )
};

export default MapView;