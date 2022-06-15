import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getOwners, getProviderById, postProvider, putProvider } from "../../redux/actions/ownProvActions";
import { Link, useNavigate } from "react-router-dom";
import style from "./InfoProvider.module.css";
import NavBar from "../NavBar/NavBarShop";
import Footer from "../Footer/Footer";

export default function InfoProvider() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const provider = useSelector(state => state.owners);
  const [userInfo, setUserInfo] = useState(false)
    

  useEffect(() => {
      dispatch(getOwners())
  }, [dispatch]);
  useEffect(() => {
    if(user){
    setUserInfo(provider.find(x=>x.email === user.email))

    }
}, [provider, user]);
  function walk() {
    console.log("user infoooooooooooooooooooooooooo",userInfo);
    dispatch(
      postProvider({
        email: user.email,
        name: user.given_name,
        lastName: user.family_name,
        service: ["paseo"],
        latitude: userInfo.latitude,
        longitude: userInfo.longitude,
      })
    );
  }

  function lodging() {
    console.log(userInfo);
    dispatch(
      postProvider({
        email: user.email,
        name: user.given_name,
        lastName: user.family_name,
        service: ["hospedaje"],
        latitude: userInfo.latitude,
        longitude: userInfo.longitude,
      })
    );
  }

  return (
    <div>
      <NavBar />
      <div className={style.container}>
        <Container>
          <div className={style.centerFlex}>
            <h2>¿Qué servicio te gustaría ofrecer?</h2>
            <div className={style.buttons}>
              <div className={style.button}>
              <Link to="/paseo">
                <button onClick={walk} disabled={userInfo?false:true}>PASEO</button>
              </Link>
              </div>
              <div>
              <Link to="/hospedaje">
                <button onClick={lodging} disabled={userInfo?false:true}>HOSPEDAJE</button>
              </Link>
              </div>  
            </div>
            {/* <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          type="text"
          placeholder="Localidad"
          name="city"
          onChange={formik.handleChange}
          error={formik.errors.city}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Provincia"
          name="state"
          onChange={formik.handleChange}
          error={formik.errors.state}
        ></Form.Input>
        <Form.Input
          type="text"
          placeholder="Dirección"
          name="road"
          onChange={formik.handleChange}
          error={formik.errors.state}
        ></Form.Input>
        <Button type="submit">Enviar</Button>
      </Form> */}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
