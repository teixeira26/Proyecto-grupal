import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "../Shop/ProductCard.module.css";
import { Link } from "react-router-dom";
import { addTofavorites } from "../../redux/actions/petshopActions";
import axios from "axios";
import Swal from 'sweetalert2'

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
    if (user) {
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
        console.log(objToPut)
        await axios.put("http://localhost:3001/owners/addFavorite", objToPut);
      }}
      else{ 
        Swal.fire('Debés registrarte a la página para agregar productos a favoritos')}
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.addFav}
          onClick={addFavorite}>
          {
            !isFavorite
              ? <img src="../assets/img/favorite-item.svg" alt="" />
              : <img src="../assets/img/favorite-fill.svg" alt="" />
          }
        </div>
        <Link to={`/shop/${id}`}>
          <img src={profilePicture} alt="" className={styles.cardImg} />
          <div className={styles.cardInfo}>
            <div className={styles.cardBottom}>
              <p className={styles.price}>${price}</p>
              <h2 className={styles.cardTitle}>{name}</h2>
              {/* <button className={styles.addButton} onClick={()=>{
              dispatch({
              type:TYPES.ADD_TO_CART,
              payload:id,
            })}}>Agregar al carrito</button> */}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
