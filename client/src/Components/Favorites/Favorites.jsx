import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getProducts } from "../../redux/actions/petshopActions";
import NavBarShop from "../NavBar/NavBarShop";

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

    return(
        <div>
          {productsFav&&productsFav.length?productsFav.map(x=>{
          return(
            <div>    
                <h1>{x.name}</h1>
                <img alt='img not found' src={x.profilePicture}></img>
            </div>
          )
          }):<h1>NO hay favoritos</h1>}
        </div>
    )
};

export default Favorites;