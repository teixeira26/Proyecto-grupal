import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from 'react-router-dom';
import { filterByProviderService, getProviders, sortByProviderPrice } from "../../redux/actions/ownProvActions";
import ProvidersCard from "./ProvidersCard";
import NavBarShop from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import styles from "../Providers/Providers.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";

export default function Providers() {
    const dispatch = useDispatch()
    // const [order, setOrder] = useState('ASC')
    // const [filter, setFilter] = useState('')

    useEffect(() => {
        dispatch(getProviders())
    }, [dispatch])

    const providers = useSelector(state => state.filteredProviders);

    function handleFilterService(e) {
        console.log(e.target.value);
        dispatch(filterByProviderService(e.target.value))
    }

    function handleOrderPrice(e) {
        console.log(e.target.value)
        dispatch(sortByProviderPrice(e.target.value))
    }

    function handleRemove(e) {
        e.preventDefault()
        dispatch(getProviders())
    }

    return (
        <div>
            <NavBarShop />
            <section className={inContainer.container}>
                <NavLink to="/home">
                    <img
                        src="/assets/img/arrow-left.svg"
                        alt=""
                        className={styles.leftArrow}
                    />
                </NavLink>
                <h1 className={styles.providersTitle}>Listado de proveedores</h1>
                <div className={styles.providersFlex}>
                    <div className={styles.providersFilters}>
                        <section className={styles.selects}>
                            <p className={styles.filterTitle}>Filtrar por</p>
                            <select className={styles.select} onChange={(e) => handleFilterService(e)}>
                                <option hidden={true}>Tipo de servicio</option>
                                <option value="">Todos</option>
                                <option value="hospedaje">Hospedaje</option>
                                <option value="paseo">Paseo</option>
                            </select>
                        </section>
                        <br />
                        <section className={styles.selects}>
                            <p className={styles.filterTitle}>Ordenar por</p>
                            <select className={styles.select} onChange={handleOrderPrice}>
                                <option hidden={true}>Rango de precio</option>
                                <option value="ASC">Mayor a menor</option>s
                                <option value="DESC">Menor a mayor</option>
                            </select>
                        </section>
                        <br />
                        <button onClick={handleRemove}>Limpiar filtros</button>
                    </div>
                    <div className={styles.providersGrid}>
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
                </div>
            </section>
            <Footer />
        </div>
    )
};