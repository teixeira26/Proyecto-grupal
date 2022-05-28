import React, { useState } from "react";
import {Container, Form, Button, TextArea} from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Widget } from "@uploadcare/react-widget";
import * as yup from 'yup';
import "semantic-ui-css/semantic.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";


export const InfoProvider = ()=>{
    const [isLoaded, setIsLoaded] = useState(false);
    const {user} = useAuth0();

    const [infoProvider, setInfoProvider] = useState({
        email:user.email,
        name:user.given_name,
        lastName: user.family_name,
        profilePicture:"",
        adress:{},
        description:"",
        price:"",
        dogsperwalk:"",
    })

    // const promiseLoading = ()=>{
    //     return new Promise((resolve, reject)=>{
            
    //         while(true){
    //             if(infoProvider.adress.city) break
    //             console.log(infoProvider.adress)
    //         }
    //         setIsLoaded(true)
    //     })
    // }

    const formik = useFormik({
        initialValues:{
            profilePicture:"",
            adress:"",
            city:"",
            state:"",
        },
        validationSchema:yup.object({
            adress:yup.string().required(),
            city:yup.string().required(),
            state:yup.string().required(),
        }),

        onSubmit: async(formData)=>{
            try {
                setInfoProvider({
                    ...infoProvider,
                    adress:{
                        road:formData.adress,
                        city:formData.city,
                        state:formData.state
                    },
                    description:formData.description,
                    price:formData.price,
                    dogsperwalk:formData.dogsperwalk  ,
                });
                const allUsers = await axios.get('http://localhost:3001/providers');
                const userToChange = allUsers.data.find(x=>x.mail === user.mail);
                // await promiseLoading()
                axios.put(`http://localhost:3001/providers/${userToChange.id}`, infoProvider)
                // setIsLoaded(false);
            } catch (error) {
                alert('jijij')
            }
            
        }
    })

    function handleProfilePicture(e){      
        setInfoProvider({
            ...infoProvider,
            profilePicture: e.originalUrl
        })
    }
    return(
        <Container className='container'>
            <h1>Antes de Seguir necesitamos más información</h1>
            <Form onSubmit={formik.handleSubmit}>
                <label htmlFor="">Foto de perfil: </label>
                <Widget 
                    publicKey='269841dc43864e62c49d'
                    id='file'
                    onChange={handleProfilePicture}
                    name="profilePicture"
                    />
                <Form.Input type="text" placeholder="dirección" name="adress" onChange={formik.handleChange} error={formik.errors.adress}></Form.Input>
                <Form.Input type="text" placeholder="localidad" name="city" onChange={formik.handleChange} error={formik.errors.city}></Form.Input>
                <Form.Input type="text" placeholder="provincia" name="state" onChange={formik.handleChange} error={formik.errors.state}></Form.Input>
                {/* <label htmlFor="adress">servicio</label>
                <Form.Input type="checkbox"name="adress"></Form.Input> */}
                {/* <Form.Input type='number' placeholder="servicio"></Form.Input>   */}   
                {/* <TextArea type="textarea"name="description" placeholder='description' onChange={formik.handleChange} error={formik.errors.description}></TextArea> */}
                {/* <Form.Input type='number' placeholder="precio/hora" name="price" onChange={formik.handleChange} error={formik.errors.price}></Form.Input> */}
                {/* <Form.Input type='number' placeholder="perros por paseo" name="dogsperwalk" onChange={formik.handleChange} error={formik.errors.dogsperwalk}></Form.Input> */}
                <Button type="submit">Enviar</Button>
            </Form>
        </Container>
    )
}
export default InfoProvider;