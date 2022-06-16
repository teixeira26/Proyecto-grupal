import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Home/Home.module.css";
import NavBarShop from "../NavBar/NavBarShop";
import inContainer from "../GlobalCss/InContainer.module.css";
import HomeCard from "./HomeCard";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  console.log("USUARIO", user);

  useEffect(() => {
    if (user) {
      axios.get("https://proyecto-grupal.herokuapp.com/owners").then((x) => {
        const userdb = x.data.find((x) => x.email === user.email);
        console.log("USUARIO ENTRA", userdb);
        if (userdb) {
          setUserData({
            nombre: user.name,
            picture:
              userdb.profilePicture && userdb.profilePicture[0]
                ? userdb.profilePicture[0]
                : "/assets/img/notloged.png",
            email: user.email,
            pets: userdb.pets,
            address: userdb.address,
            isAdmin: userdb.isAdmin,
            isBanned: userdb.isBanned,
          });
        }
      });
    }

    // axios.get(`https://proyecto-grupal.herokuapp.com/owners/getFavorites/${user.email}`).then(x=>{
    //     setProductsFavNumber(x.data)})
  }, [dispatch, user]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(
          "getCurrentPosition: ",
          position.coords.latitude,
          position.coords.longitude
        );
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true, // Cada vez que pueda extraerá desde el GPS info extra.
      }
    );
  }, []);

  useEffect(() => {
    console.log("soy las cordinadas", location);
    if (user && location.latitude !== 0) {
      let owner = {
        email: user.email,
        name: user.given_name,
        lastName: user.family_name,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      console.log("TA BANEAU", owner);
      axios.post("https://proyecto-grupal.herokuapp.com/owners", owner);
    }
  }, [user, location]);

  return (
    <div className={styles.body}>
      {isAuthenticated && console.log(user)}
      <NavBarShop />
      <div className={inContainer.container}>
        <div className={styles.container}>
          <h1 className={styles.homeTitle}>¿Qué estás buscando?</h1>
          <div className={styles.cardWrapper}>
            <Link to="/providers">
              <HomeCard
                name="Paseos y hospedaje"
                img="assets/img/paseador.png"
              />
            </Link>
            <Link to="/shop">
              <HomeCard name="Comprar productos" img="assets/img/shop.png" />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.stickyFooter}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
