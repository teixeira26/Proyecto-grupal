import React from "react";
import { Marker } from "react-leaflet";
import { IconLocation } from "./IconLocation";

const Markers = (props) => {
    console.log('props en Markers: ', props.data);
    return (
        <Marker position={props.data} icon={IconLocation} />
    )
};

export default Markers;
