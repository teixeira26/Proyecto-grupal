import React from "react";
import styles from "../Home/Home.module.css";
import NavBar from "../NavBar/NavBar";
import inContainer from "../GlobalCss/InContainer.module.css";
import HomeCard from "./HomeCard";
import Footer from "../Landing/Footer/Footer";

import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      {!isAuthenticated && <Login></Login>}
      {isAuthenticated && <Logout></Logout>}
      {isAuthenticated && <img src={user.picture}></img>}
      {isAuthenticated && console.log(user)}

      <NavBar />

      <div className={inContainer.container}>
        <h1 className={styles.homeTitle}>Lorem ipsum dolor sit.</h1>

        <div className={styles.cardWrapper}>
          <HomeCard />
          <HomeCard />
          <Link to="/shop">
            <HomeCard />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
