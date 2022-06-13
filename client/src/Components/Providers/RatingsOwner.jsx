import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from '../Providers/ProvidersCard.module.css';
import NavBar from "../NavBar/NavBarShop";
import { Container } from "semantic-ui-react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const RatingsOwner = ()=>{
    const {user, isAuthenticated} = useAuth0();
    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        if (isAuthenticated) {
            axios.get("http://localhost:3001/reviews").then((x) => {
              let myreviews = x.data.filter((x) => x.owner.email === user.email);
              if(myreviews.length)setReviews(myreviews)
            })}
    },[isAuthenticated])
    return(
        <div>
        <NavBar />
      <div className={style.container}>
        <Container>
          <div className={style.centerFlex}>
            <h2 style={{display:'inline'}}>Mis calificaciones:  </h2>
            <br/>
            <br/>
        <div style={{marginBottom:30}}>
        {reviews && reviews.length?
        reviews.map((x,y)=>{
            return(
                <div key={y}>
                    <hr/>  
                    <div>
                    <p className={style.star}>{x.review>=1?'★':'☆'}</p>
                    <p className={style.star}>{x.review>=2?'★':'☆'}</p>
                    <p className={style.star}>{x.review>=3?'★':'☆'}</p>
                    <p className={style.star}>{x.review>=4?'★':'☆'}</p>
                    <p className={style.star}>{x.review===5?'★':'☆'}</p>
                    </div>
                    <h4 style={{display:'inline'}}>{x.owner.name} {x.owner.lastName}:</h4>
                    <p style={{display:"inline", color:'blue'}}> {x.message}</p>
                    <h4>reseña hecha a: {x.provider.name} {x.provider.lastName}</h4>
                    <Link to={`/cambiarCalificacion/${x.id}?providerEmail=${x.provider.email}`}>
                      <button style={{display:"block"}}>cambiar</button>
                    </Link>
                </div>
            )
        }):null}
        </div>
        </div>
        </Container>
      </div>
      <Footer />
    </div>
    )
}


export default RatingsOwner