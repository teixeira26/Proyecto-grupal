import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "../Shop/ProductCard.module.css";
import { Link } from "react-router-dom";

import axios from "axios";

const ProductCard = ({ profilePicture, name, price, isFavorite, id, setFavorites, favorites }) => {
  const { user } = useAuth0();
  const dispatch = useDispatch()
  const addFavorite = async () => {
    if (!isFavorite) {
      const AllOwners = await axios.get("http://localhost:3001/owners")
      const owner = AllOwners.data.find(x=>x.email === user.email)
      console.log(owner)
      let objToPut = {
        ...owner,
        favorites: owner.favorites[0] ? [...owner.favorites, id] : [id]
      }
      setFavorites([...favorites,id])

      await axios.put("http://localhost:3001/owners/addFavorite", objToPut)
    }
    else {
      const AllOwners = await axios.get("http://localhost:3001/owners")

      const owner = AllOwners.data.find(x=>x.email === user.email)
      console.log(owner)
      let objToPut = {
        ...owner,
        favorites: owner.favorites[0] ? owner.favorites.filter(x => x !== id) : []
      }
      setFavorites(favorites.filter(x => x !== id))
      console.log(objToPut)
      await axios.put("http://localhost:3001/owners/addFavorite", objToPut)
    }

  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={profilePicture} alt="" className={styles.cardImg} />

        <img src={!isFavorite?"https://static.vecteezy.com/system/resources/previews/005/218/113/non_2x/heart-contour-outline-line-icon-black-color-illustration-image-thin-flat-style-vector.jpg":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/640px-Heart_coraz%C3%B3n.svg.png"} alt="" className={styles.addFav} onClick={addFavorite}/>

        <div className={styles.cardInfo}>
        <Link to={`/shop/${id}`}>
          <h2 className={styles.cardTitle}>{name}</h2>
          </Link>
          <div className={styles.cardBottom}>
            <p className={styles.price}>${price}</p>
            {/* <button className={styles.addButton} onClick={()=>{
              dispatch({
              type:TYPES.ADD_TO_CART,
              payload:id,
            })}}>Agregar al carrito</button> */}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;