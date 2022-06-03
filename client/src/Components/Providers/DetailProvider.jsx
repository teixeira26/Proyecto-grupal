import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProviderById } from "../../redux/actions/ownProvActions";

import NavBarRegistered from "../NavBar/NavBarRegistered";
import Footer from "../Footer/Footer";
import DetailProviderCard from "./DetailProviderCard";

import styles from "../Shop/ProductDetail.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";

export default function DetailProvider() {
    const dispatch = useDispatch();
    const email = useParams().name;
    const provider = useSelector(state => state.providers);
    
    useEffect(() => {
        dispatch(getProviderById())
    }, []);

    useEffect(() => {
        dispatch(getProviderById(email))
    }, [dispatch, email]);

    return (
        <div className={styles.container}>
            <NavBarRegistered />
            <div className={inContainer.container}>
                <button>X</button>
                {!provider.length
                    ? "LOADING"
                    : provider.map((p) => {
                        return (
                            <DetailProviderCard
                                key={email}
                                email={email}
                                name={p.name}
                                lastName={p.lastName}
                                profilePicture={p.profilePicture}
                                address={p.address}
                                city={p.city}
                                state={p.state}
                                service={p.service}
                                description={p.description}
                                price={p.price}
                                typeOfHousing={p.typeOfHousing}
                                housingPhotos={p.housingPhotos}
                                dogsPerWalk={p.dogsPerWalk}
                            />
                        );
                    })}
            </div>
            <Footer />
        </div>
    )
};