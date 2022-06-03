import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProviders } from "../../redux/actions/ownProvActions";
import ProvidersCard from "./ProvidersCard";
import NavBarRegistered from "../NavBar/NavBarRegistered";
import Footer from "../Footer/Footer";
import styles from "../Providers/Providers.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";

export default function Providers(){

    const dispatch = useDispatch()
    const [order, setOrder] = useState('ASC')
    const [filter, setFilter] = useState('')

    useEffect(()=>{
        dispatch(getProviders(filter, order))
    },[dispatch, filter, order])

    const providers = useSelector(state => state.providers);
    
    function handleFilter(e){
        console.log(e.target.value)
        setFilter(e.target.value)
    }

    function handleOrder(e){
        setOrder(e.target.value)
    }

    function handleRemove(e){
        e.preventDefault()
        setFilter('')
    }

    return (
        <div>
            <NavBarRegistered />
            <section className={inContainer.container}>
                <h1 className={styles.shopTitle}>Listado de proveedores</h1>
                <h5>Filtrar por Servicio</h5>

                <select onChange={(e) => handleFilter(e)}>
                    <option hidden={true}>Servicio</option>
                    <option value="">Todos</option>
                    <option value="hospedaje">Hospedaje</option>
                    <option value="paseo">Paseo</option>
                </select>

                <h5>Ordenar por Precio</h5>
                <select onChange={handleOrder}>
                    <option hidden={true}>Precio</option>
                    <option value="ASC">Ascendente</option>s
                    <option value="DESC">Descendente</option>
                </select>

                <br />

                <button onClick={handleRemove}>Remover filtros</button>

                <div className={styles.product}>
                    {!providers.length ? 'LOADING' :
                        providers.map((p, g) => {
                            return <ProvidersCard key={p.id}
                                name={p.name}
                                lastName={p.lastName}
                                email={p.email}
                                profilePicture={p.profilePicture}
                                price={p.price}
                                service={p.service} />
                        })}
                </div>
            </section>
            <Footer />
        </div>
    )
}