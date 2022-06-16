import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProviderById } from "../../redux/actions/ownProvActions";
import NavBarShop from '../NavBar/NavBarShop';
import Footer from "../Footer/Footer";
import DetailProviderCard from "./DetailProviderCard";

import styles from "../Shop/ProductDetail.module.css";
import inContainer from "../GlobalCss/InContainer.module.css";
import { cleanDetail } from "../../redux/actions/petshopActions";

export default function DetailProvider() {
    const dispatch = useDispatch();
    const email = useParams().name;
    const provider = useSelector(state => state.providers);
    
    useEffect(() => {
        dispatch(getProviderById(email))
    }, [dispatch, email]);

    useEffect(() => {
        return ()=>dispatch(cleanDetail())
    }, [dispatch]);


    return (
        <div>
            <NavBarShop />
            <div className={inContainer.container}>
                <NavLink to="/yumpis">
                    <img src="/assets/img/arrow-left.svg" alt="" className={styles.leftArrow} />
                </NavLink>
                {!provider.length
                    ? "LOADING"
                    : provider.map((p) => {
                        console.log("soy toda la info de este provider",p)
                        return (
                            <DetailProviderCard
                                key={email}
                                email={email}
                                name={p.name}
                                lastName={p.lastName}
                                profilePicture={p.profilePicture&&p.profilePicture.length?p.profilePicture: "/assets/img/notloged.png"}
                                address={p.address}
                                city={p.city}
                                state={p.state}
                                service={p.service}
                                description={p.description}
                                price={p.price}
                                typeOfHousing={p.typeOfHousing}
                                housingPhotos={p.housingPhotos}
                                dogsPerWalk={p.dogsPerWalk}
                                schedule={p.schedule}
                                latitude = {p.latitude}
                                longitude = {p.longitude}
                            />
                        );
                    })}
            </div>
            <Footer />
        </div>
    )
};