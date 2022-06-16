import React, { useEffect, useRef, useState } from "react";
import "./DropdownMenu.css";

import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Auth0/Login";
import Logout from "../Auth0/Logout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addTofavorites, chargeCart } from "../../redux/actions/petshopActions";
import axios from "axios";

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(chargeCart('cart'));
      axios.get("https://proyecto-grupal.herokuapp.com/owners").then((x) => {
        const userdb = x.data.find((x) => x.email === user.email);
        console.log('USUARIO DB', userdb)
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
            isAdmin: userdb.isAdmin
          });
        }
      });
    }

    // axios.get(`https://proyecto-grupal.herokuapp.com/owners/getFavorites/${user.email}`).then(x=>{
    //     setProductsFavNumber(x.data)})
  }, [dispatch, user]);

  useEffect(() => {
    const pageClickEvent = (e) => {
      console.log(e);
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className="menu-container">
      <div onClick={onClick} className="menu-trigger">
        {/* <span>User</span> */}
        {/* <img
          src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
          alt=""
        /> */}
        <div className="picture-flex">
          {!isAuthenticated && <img src="" alt=""></img>}
          {isAuthenticated && (
            <img className="profilePicture" src={userData.picture?userData.picture: "/assets/img/notloged.png"} alt=""></img>
          )}
        </div>
      </div>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          <li className="li-flex">
            <img src="../assets/img/person-outline.svg" alt="" className="person-outline"/>
            {
              userData.isAdmin ?
              <NavLink to="/admin">Perfil</NavLink>
                : <NavLink to="/mi-perfil">Perfil</NavLink>
            }
          </li>
          {/* <li>
            <a href="">Editar Perfil</a>
          </li> */}
          {/* <li>
            <a href="">Mensajes</a>
          </li> */}
          {/* <li>
            <a href="">Agregar Mascota</a>
          </li> */}
          <li className="li-flex">
            <img src="../assets/img/log-out.svg" alt="" className="log-out" />
            <button
              className="button"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
