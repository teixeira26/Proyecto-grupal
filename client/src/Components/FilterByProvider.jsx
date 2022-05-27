import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProviders, filterByProvider } from "../actions/ownProvActions";

export default function FilterByProvider() {
    const dispatch = useDispatch();

    // Traemos el estdo de redux con los providers
    const providers = useSelector(state => state.copyProviders);
    const providersArr = providers?.map(p => p.name);

    useEffect(() => {
        dispatch(getProviders())
    }, [dispatch]);

    function handleFilterByProvider(e) {
        e.preventDefault();
        dispatch(filterByProvider(e.target.value));
    };

    return (
        <div>

            <h5>Filtrar por Proveedor</h5>

            <select onChange={(e) => handleFilterByProvider(e)}>
                <option value="All">Todos</option>
                {providersArr?.map(p => (
                    <option value={p} key={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>

        </div>
    );

}