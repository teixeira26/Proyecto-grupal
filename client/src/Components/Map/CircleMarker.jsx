import React from "react";
import { Circle } from "react-leaflet";

const CircleMarker = (props) => {
    console.log('props en CircleMarker: ', props.data.lat, props.data.lng);
    return (
        <Circle center={[props.data.lat, props.data.lng]} radius={1000} />
    )
};

export default CircleMarker;
