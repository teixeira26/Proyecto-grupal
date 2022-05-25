import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function AddOwner(){

    const navigate = useNavigate();

    const [owner, setOwner] = useState({
        name: '',
        lastName: '',
        email: ''
    })

    
    function handleState(e){
        setOwner({
            ...owner,
            [e.target.name]: e.target.value
        })

    }



    async function onSubmit(e){
    e.preventDefault();
    try{
    await axios.post('http://localhost:3001/owners', owner)

        alert('Perfil creado con éxito')

        setOwner({
            name: '',
            lastName:'',
            email:''
        })
        navigate('/agregarMascota')
    }catch(err){
        alert(err.response.data)
    }
}

    return(
        <div>
            <h2>Registrate</h2>
            <h3>Y formá parte de la comunidad mascotera más grande de Latam</h3>

            <form onSubmit={onSubmit}>
                <div>
                    <label>NOMBRE</label>
                    <input name='name'
                           onChange={handleState}
                           value={owner.name}/>
                </div>

                    <br/>

                <div>
                    <label>APELLIDO</label>
                    <input name='lastName'
                           onChange={handleState}
                           value={owner.lastName}/>
                </div>

                    <br/>

                <div>
                    <label>EMAIL</label>
                    <input name='email'
                           onChange={handleState}
                           value={owner.email}/>
                </div>

                    <br/>


            <button type='submit'> Crear perfil </button>

            </form>
        </div>
    )
}