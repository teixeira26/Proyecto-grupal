import React from "react";
import { useDispatch } from "react-redux";
import { filterByProvider } from "../actions";

export default function FilterByProvider() {
    //const dispatch = useDispatch();

    function handleFilterByProvider(e) {
        e.preventDefault();
        //dispatch(filterByProvider(e.target.value));
    };

    return (
        <div>

            <h5>Filtrar por Proveedor</h5>

            <select onChange={(e) => handleFilterByProvider(e)}>
                <option value="All">Todos</option>
                <option value="Mafalda">Mafalda</option>
                <option value="Tito">Tito</option>
                <option value="Batman">Batman</option>
                <option value="Cassandra">Cassandra</option>
                <option value="Jorge">Jorge</option>
                <option value="Marcos">Marcos</option>
                <option value="Matías">Matías</option>
            </select>

        </div>
    );

}