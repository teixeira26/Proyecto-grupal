import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameOwner } from '../actions';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
            }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameOwner(name));
        setName(''); // Limpiamos el cuadro de búsqueda.
    }

    return (
        <div>
            <input
                type='text'
                value={name}  
                placeholder='Buscar Propietario...'
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