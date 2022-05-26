import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwner, filterByOwner } from "../actions";

export default function FilterByOwner() {
    const dispatch = useDispatch();

    // Traemos el estdo de redux con los owners
    const owners = useSelector(state => state.copyOwners);
    const ownersArr = owners?.map(o => o.name);

    useEffect(() => {
        dispatch(getOwner())
    }, [dispatch]);

    function handleFilterByOwner(e) {
        e.preventDefault();
        dispatch(filterByOwner(e.target.value));
    };

    return (
        <div>

            <h5>Filtrar por Dueño</h5>

            <select onChange={(e) => handleFilterByOwner(e)}>
                <option value="All">Todos</option>
                {ownersArr?.map(a => (
                    <option value={a} key={a}>
                        {a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()}
                    </option>
                ))}
            </select>

        </div>
    );

}