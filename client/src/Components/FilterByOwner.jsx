import React from "react";
import { useDispatch } from "react-redux";
import { filterByOwner } from "../actions";

export default function FilterByOwner() {
    //const dispatch = useDispatch();

    function handleFilterByOwner(e) {
        e.preventDefault();
        //dispatch(filterByOwner(e.target.value));
    };

    return (
        <div>

            <h5>Filtrar por Dueño</h5>

            <select onChange={(e) => handleFilterByOwner(e)}>
                <option value="All">Todos</option>
                <option value="Franco">Franco</option>
                <option value="Alan">Alan</option>
                <option value="Sabrina">Sabrina</option>
                <option value="Mica">Mica</option>
                <option value="Matheus">Matheus</option>
                <option value="Sebastian">Sebastian</option>
                <option value="Leo">Leo</option>
            </select>

        </div>
    );

}