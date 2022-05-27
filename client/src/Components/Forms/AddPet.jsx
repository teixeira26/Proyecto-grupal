import axios from 'axios';
import { useState } from 'react';
import { Widget } from "@uploadcare/react-widget";
import Swal from 'sweetalert2';

export default function AddPet(){

    const [pet, setPet] = useState({
        name: '',
        type: '',
        race: '',
        size: '',
        photos: []
    })

    
    function handleStatePet(e){

        setPet({
            ...pet,
            [e.target.name]: e.target.value
        })

    }


        function handlePicturePet(e){

            
        setPet({
            ...pet,
            photos: [...pet.photos, e.originalUrl]
        })

    }






    async function onSubmit(e){
    e.preventDefault();
    try{
    await axios.post('http://localhost:3001/pets', pet)

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Perfil creado con éxito',
        showConfirmButton: false,
        timer: 1500
      });

        setPet({
            name: '',
            type: '',
            race: '',
            size: '',
            ownerName: '',
            photos: [],
            })

       

    }catch(err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data,
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
}

    return(
        <div>
            <h3>Agregá a tu mascota</h3>

            <form onSubmit={onSubmit}>

                <div>
                    <label>DUEÑO</label>
                    <input name='ownerName'
                           onChange={handleStatePet}
                           value={pet.ownerName}/>
                </div>

                <div>
                    <label>NOMBRE MASCOTA</label>
                    <input name='name'
                           onChange={handleStatePet}
                           value={pet.name}/>
                </div>

                <div>
                    <label>TIPO DE MASCOTA</label>
                    <select name='type'
                           onChange={handleStatePet}
                           value={pet.type}>
                        
                        <option hidden={true}>Seleccioná</option>
                        <option>Perro</option>
                        <option>Gato</option>
                        <option>Conejo</option>
                        <option>Pez</option>

                    </select>

                </div>


                <div>
                <label>RAZA</label>
                    <input name='race'
                           onChange={handleStatePet}
                           value={pet.race}/>
                    
                </div>

                <div>
                <label>TAMAÑO</label>
                <label><input type='radio'
                       name='size'
                       value='Chico'
                       onChange={handleStatePet}></input>Chico</label>
                <label><input type='radio'
                       name='size'
                       value='Mediano'
                       onChange={handleStatePet}></input>Mediano</label>
                <label><input type='radio'
                       name='size'
                       value='Grande'
                       onChange={handleStatePet}></input>Grande</label>
                </div>


                <Widget 
                    publicKey='269841dc43864e62c49d' 
                    id='file'
                    onChange={handlePicturePet}
                    perrito="profilePicture"

                    />


            <button type='submit'> Agregar mascota </button>

            </form>
        </div>
    )
}