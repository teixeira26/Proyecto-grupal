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
import NoResults from '../../Views/Profile/NoResultsProviders';
import Pagination from '@mui/material/Pagination';

export default function Providers() {
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState([])
    // const [order, setOrder] = useState('ASC')
    // const [filter, setFilter] = useState('')

    useEffect(() => {
        dispatch(getProviders())
        axios.get('http://localhost:3001/reviews').then(x => setReviews(x.data))
        console.log('isjdisjdsjdisdjiosdj', reviews)
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
                <NavLink to="/inicio">
                    <img
                        src="/assets/img/arrow-left.svg"
                        alt=""
                        className={styles.leftArrow}
                    />
                </NavLink>
                <h1 className={styles.providersTitle}>¡Conoce a nuestros yumpys!</h1>
                <p>Encuentra la mejor opción para el paseo u hospedaje que estás necesitando</p>
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
                        {!providers.length ? <NoResults /> :
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
            {/* <Pagination count={10} shape="rounded" /> */}
            <Footer />
        </div>
    )
};