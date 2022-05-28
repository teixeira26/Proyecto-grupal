import ProvidersCard from "./ProvidersCard"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react'
import { getProviders } from "../../redux/actions/ownProvActions"
import styles from "../Providers/Providers.module.css"
import inContainer from "../GlobalCss/InContainer.module.css"
import NavBar from "../NavBar/NavBar"
import Footer from "../Landing/Footer/Footer"


export default function Providers(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProviders())
    },[dispatch])
  
    const providers = useSelector(state => state.providers);

    return (
    <div>

    <NavBar />
      <section className={inContainer.container}>
            <h1 className={styles.shopTitle}>Listado de proveedores</h1>

            <div className={styles.product}>
            {!providers.length? 'LOADING' :
            providers.map(p =>{
            return <ProvidersCard key={p.id}
                                name={p.name}
                                lastName={p.lastName}
                                profilePicture={p.profilePicture}
                                price={p.price}
                                service={p.service}/>
                        })}

            </div>
        </section>
        <Footer />
    </div>
)}