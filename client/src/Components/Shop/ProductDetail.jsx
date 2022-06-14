import React, { useEffect } from "react";
import NavBarShop from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";
import inContainer from "../GlobalCss/InContainer.module.css";
import styles from "../Shop/ProductDetail.module.css";
import ProductDetailCard from "./ProductDetailCard";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, cleanDetail } from "../../redux/actions/petshopActions";
import { Button } from "@material-ui/core";
import { getOwners } from "../../redux/actions/ownProvActions";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../Loading/Loader";

const ProductDetail = () => {
  const { user } = useAuth0();
  let { id } = useParams();
  let dispatch = useDispatch();
  let product = useSelector(state => state.productDetail);

  useEffect( () => {
    dispatch(getById(id))
    dispatch(getOwners())
  }, [dispatch, id]);

  useEffect( () => {
      return dispatch(cleanDetail())
  }, [dispatch]);

  const allUsers = useSelector(state => state.owners);
  const userDb = allUsers.find(us => us.email === user.email);

  return (
    <div className={styles.container}>
      <NavBarShop />
      <div className={inContainer.container}>
      <NavLink to="/shop">
          <img src="/assets/img/arrow-left.svg" alt="" className={styles.leftArrow}/>
        </NavLink>
        {!product.length
          ? <Loader/>
          : product.map((p) => {
              return (
                <ProductDetailCard
                  key={p.id}
                  id = {p.id}
                  profilePicture={p.profilePicture}
                  name={p.name}
                  price={p.price}
                  category={p.category}
                  stock={p.stock}
                  description={p.description}
                />
              );
            })}
            {userDb?.isAdmin? <Link to='/admin/listado-productos'><Button>VOLVER AL LISTADO</Button></Link> : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
