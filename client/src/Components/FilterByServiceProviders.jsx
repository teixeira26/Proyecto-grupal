import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviders, filterByServiceProviders } from "../actions";

export default function FilterByServiceProviders() {
    const dispatch = useDispatch();

    // Traemos el estdo de redux con los providers
    const providers = useSelector(state => state.services);
    const providersArr = providers?.map(p => p.service);

    useEffect(() => {
        dispatch(getProviders())
    }, [dispatch]);

    function handleFilterByServiceProviders(e) {
        e.preventDefault();
        dispatch(filterByServiceProviders(e.target.value));
    };

    return (
        <div>

            <h5>Filtrar por Servicio</h5>

            <select onChange={(e) => handleFilterByServiceProviders(e)}>
                <option value="All">Todos</option>
                {providersArr?.map(s => (
                    <option value={s} key={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>

        </div>
    );

}