import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getProducts } from "../../redux/actions/petshopActions";
import NavBarShop from "../NavBar/NavBarShop";
import Button from "../GlobalCss/Button.module.css";
import { Link } from "react-router-dom";

const Favorites = ()=>{
    const products = useSelector((state) => state.filteredProducts);
    const {user} = useAuth0()
    const [productsFav, setProductsFav] = useState([])
    const [productsFavNumber, setProductsFavNumber] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`http://localhost:3001/owners/getFavorites/${user.email}`).then(x=>{
        setProductsFavNumber(x.data)
      })
      dispatch(getProducts());
      }, [dispatch, user.email]);

    useEffect(() => {
      setProductsFav(products.filter(x=>{
          if(productsFavNumber.includes(x.id)){
              return x
          }
      }))
    }, [products, productsFavNumber]);


    async function deleteFav(id){
      let withoutFav = productsFav.filter(fav => fav.id !== id)
      setProductsFav(withoutFav)

      const AllOwners = await axios.get("http://localhost:3001/owners")

      const owner = AllOwners.data.find(x=>x.email === user.email)
      console.log(owner)
      let objToPut = {
        ...owner,
        favorites: owner.favorites[0] ? owner.favorites.filter(x => x !== id) : []
      }
      console.log(objToPut)
      await axios.put("http://localhost:3001/owners/addFavorite", objToPut)
    }

    return(
        <div>
          <Link to='/shop'>
          <button>Volver al shop</button>
          </Link>
          {productsFav&&productsFav.length?productsFav.map(x=>{
          return(
            <div> 
                <Link to={`/shop/${x.id}`}>
                <h1>{x.name}</h1>
                <img alt='img not found' src={x.profilePicture}></img>
                </Link>

                <button onClick={() => deleteFav(x.id)}>Quitar de favoritos</button>

            </div>
          )
          }):<h1>NO hay favoritos</h1>}
        </div>
    )
};

export default Favorites;