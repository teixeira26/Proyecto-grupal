import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getServiceProviders } from '../redux/actions/ownProvActions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [service, setService] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setService(e.target.value);
            }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getServiceProviders(service));
        setService(''); // Limpiamos el cuadro de búsqueda.
    }

    return (
        <div>
            <input
                type='text'
                value={service}  
                placeholder='Buscar Servicio...'
                onChange={(e) => handleInputChange(e)}
            />
            <button
                type='submit'
                onClick={(e) => handleSubmit(e)}>
                Buscar
            </button>
        </div>
    )
}