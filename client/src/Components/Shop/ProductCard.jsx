import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "../Shop/ProductCard.module.css";
import { Link } from "react-router-dom";

import axios from "axios";

const ProductCard = ({
  profilePicture,
  name,
  price,
  isFavorite,
  id,
  setFavorites,
  favorites,
}) => {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const addFavorite = async () => {
    if (!isFavorite) {
      const AllOwners = await axios.get("http://localhost:3001/owners");
      const owner = AllOwners.data.find((x) => x.email === user.email);
      console.log(owner);
      let objToPut = {
        ...owner,
        favorites: owner.favorites[0] ? [...owner.favorites, id] : [id],
      };
      setFavorites([...favorites, id]);

      await axios.put("http://localhost:3001/owners/addFavorite", objToPut);
    } else {
      const AllOwners = await axios.get("http://localhost:3001/owners");

      const owner = AllOwners.data.find((x) => x.email === user.email);
      console.log(owner);
      let objToPut = {
        ...owner,
        favorites: owner.favorites[0]
          ? owner.favorites.filter((x) => x !== id)
          : [],
      };
      setFavorites(favorites.filter((x) => x !== id));
      console.log(objToPut);
      await axios.put("http://localhost:3001/owners/addFavorite", objToPut);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.addFav}
          onClick={addFavorite}>
          {
            !isFavorite
              ? <ion-icon name="heart-outline"></ion-icon>
              : <ion-icon name="heart"></ion-icon>
          }
          
          
          
          </div>
        <Link to={`/shop/${id}`}>
          <img src={profilePicture} alt="" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>{name}</h2>

            <div className={styles.cardBottom}>
              <p className={styles.price}>${price}</p>
              {/* <button className={styles.addButton} onClick={()=>{
              dispatch({
              type:TYPES.ADD_TO_CART,
              payload:id,
            })}}>Agregar al carrito</button> */}
              <div className={styles.choContainer}></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
