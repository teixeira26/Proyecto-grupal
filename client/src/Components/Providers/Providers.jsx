import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { filterByProviderService, getProviders, sortByProviderPrice } from "../../redux/actions/ownProvActions";
import ProvidersCard from "./ProvidersCard";
import NavBarShop from '../NavBar/NavBarShop'
import Footer from "../Footer/Footer";
import styles from "../Providers/Providers.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import { LabelDetail } from 'semantic-ui-react';
import axios from 'axios';

export default function Providers() {
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState([])
    // const [order, setOrder] = useState('ASC')
    // const [filter, setFilter] = useState('')
    const [valueService, setValueService] = useState('servicio');
    const [valuePrice, setValuePrice] = useState('precio');

    useEffect(() => {
        dispatch(getProviders())
        axios.get('http://localhost:3001/reviews').then(x => setReviews(x.data))
        console.log('isjdisjdsjdisdjiosdj', reviews)
    }, [dispatch])

    const providers = useSelector(state => state.filteredProviders);

    function handleFilterService(e) {
        console.log(e.target.value);
        dispatch(filterByProviderService(e.target.value));
        setValueService(e.target.value);
    }

    function handleOrderPrice(e) {
        console.log(e.target.value);
        dispatch(sortByProviderPrice(e.target.value));
        setValuePrice(e.target.value);
    }

    function handleRemove(e) {
        e.preventDefault()
        dispatch(getProviders())
        setValueService('servicio');
        setValuePrice('precio')
    }

    return (
        <div>
            <NavBarShop />
            <section className={inContainer.container}>
                <NavLink to="/inicio">
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
                            <p className={styles.filterTitle}>Filtrar por Servicio</p>
                            <select className={styles.select} value={valueService} onChange={(e) => handleFilterService(e)}>
                                <option value="servicio" disable selected>Servicio</option>
                                <option value="hospedaje">Hospedaje</option>
                                <option value="paseo">Paseo</option>
                            </select>
                        </section>
                        <br />
                        <section className={styles.selects}>
                            <p className={styles.filterTitle}>Ordenar por Precio</p>
                            <select className={styles.select} value={valuePrice} onChange={handleOrderPrice}>
                            <option value="precio" disabled selected>Precio</option>
                                <option value="ASC">Menor a mayor</option>
                                <option value="DESC">Mayor a menor</option>
                            </select>
                        </section>
                        <br />
                        <button onClick={handleRemove}>Limpiar filtros</button>
                    </div>
                    <div className={styles.providersGrid}>
                        {!providers.length ? 'LOADING' :
                            providers.map((p, g) => {
                                let stars = 5
                                let providerEvaluations = reviews.filter(x => x.provider.email === p.email);
                                providerEvaluations = providerEvaluations.map(x => x.review)
                                let numberEvaluations = providerEvaluations.length
                                providerEvaluations = providerEvaluations.reduce((x, y) => x + y, 0)
                                stars = (providerEvaluations / numberEvaluations);
                                console.log("estrellaaaaaaaaaaaaaaaaas", stars)

                                return <ProvidersCard key={p.id}
                                    name={p.name}
                                    lastName={p.lastName}
                                    email={p.email}
                                    profilePicture={p.profilePicture}
                                    price={p.price}
                                    service={p.service}
                                    stars={stars ? stars : 5} />
                            })}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
};