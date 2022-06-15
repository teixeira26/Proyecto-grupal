import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddOwner() {
    const navigate = useNavigate();
    const [owner, setOwner] = useState({
        name: '',
        lastName: '',
        email: ''
    })

    function handleState(e) {
        setOwner({
            ...owner,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/owners', owner)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Perfil creado con éxito',
                showConfirmButton: false,
                timer: 1500
            });

            setOwner({
                name: '',
                lastName: '',
                email: ''
            })
            navigate('/agregarMascota')
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.response.data,
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }
    }

    return (
        <div>
            <h2>Registrate</h2>
            <h3>Y formá parte de la comunidad mascotera más grande de Latam</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>NOMBRE</label>
                    <input name='name'
                        onChange={handleState}
                        value={owner.name} />
                </div>
                <br />
                <div>
                    <label>APELLIDO</label>
                    <input name='lastName'
                        onChange={handleState}
                        value={owner.lastName} />
                </div>
                <br />
                <div>
                    <label>EMAIL</label>
                    <input name='email'
                        onChange={handleState}
                        value={owner.email} />
                </div>
                <br />
                <button type='submit'>Crear perfil</button>
            </form>
        </div>
    )
};