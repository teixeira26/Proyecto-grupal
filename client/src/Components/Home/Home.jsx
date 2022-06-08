import React, {useEffect} from "react";
import styles from "../Home/Home.module.css";
import NavBarRegistered from "../NavBar/NavBarRegistered";
import NavBarShop from '../NavBar/NavBarShop'
import inContainer from "../GlobalCss/InContainer.module.css";
import HomeCard from "./HomeCard";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser, getOwners } from "../../redux/actions/ownProvActions";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const users = useSelector(state => state.owners)

  useEffect(()=>{
  
    (async()=>{
      let owner = {
          email:user.email,
          name:user.given_name,
          lastName: user.family_name,
        }
        await axios.post('http://localhost:3001/owners', owner)
        // navigate('/home')
  })()

    dispatch(getOwners())
    let userdb = users.find(us => us.email === user.email)
    dispatch(authenticatedUser(userdb))
  }, [dispatch])

  const usersauth = useSelector(state => state.authUser)


  console.log('usersauth', usersauth)

  return (
    <div className={styles.body}>
      {isAuthenticated && console.log(user)}


        <NavBarShop/>


      <div className={inContainer.container}>
        <h1 className={styles.homeTitle}>¿Qué estás buscando?</h1>

        <div className={styles.cardWrapper}>
          <Link to='/providers'>
          <HomeCard name='Paseos y hospedaje' img='assets/img/paseador.png'/>
          </Link>
          <Link to="/shop">
            <HomeCard name='Comprar productos' img='assets/img/shop.png'/>
          </Link>
        </div>
      </div>

      <div className={styles.stickyFooter}>
        <Footer />
      </div>
      
    </div>
  );
};

export default Home;
