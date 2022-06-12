import React, { useEffect, useState } from "react";
import NavBarShop from "../../Components/NavBar/NavBarShop";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getOwners, getPets } from "../../redux/actions/ownProvActions";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import style from "./Profile.module.css";

export default function Profile() {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const [userData, setUser] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [isProvider, setIsProvider] = useState(false)
  const [providerInfo, setProviderInfo] = useState()
  const [eventsProvider, setEventsProvider] = useState()
  const [eventsOwner, setEventsOwner] = useState()
  useEffect(() => {
    if (isAuthenticated) {
      axios.get("http://localhost:3001/providers?filter=&order=ASC").then((x) => {
        const providerCheck = x.data.find((x) => x.email === user.email);
        if (providerCheck) {
          setIsProvider(true);
          setProviderInfo(providerCheck);
        }
      })
      axios.get("http://localhost:3001/owners").then((x) => {
        const userdb = x.data.find((x) => x.email === user.email);
        console.log(userdb);
        setUser({
          nombre: user.name,
          picture:
            userdb && userdb.profilePicture && userdb.profilePicture[0]
              ? userdb.profilePicture[0]
              : "/assets/img/notloged.png",
          email: user.email,
          pets: userdb ? userdb.pets : [],
          address: userdb.address,
          isAdmin: userdb.isAdmin
        });
        console.log("userdb", userdb);
      }).then(() => {
        return axios.get('http://localhost:3001/events')
      }).then(x => {
        setEventsOwner(x.data.filter(x => x.ownerEmail === user.email))
        setEventsProvider(x.data.filter(x => x.providerEmail === user.email))
      })
    }
  }, [user, isAuthenticated, pets, dispatch]);

  async function byePet(id) {
    await axios.delete(`http://localhost:3001/pets/${id}`, { isActive: false });
    dispatch(getPets());
  }

  console.log('USERDATA', userData)


  return (
    <main>
      <NavBarShop />
      <div className={styleContainer.container}>
        <section className={style.infoProfile}>
          <img src={userData.picture} alt="profilePicture" />
          <article className={style.profile}>
            <h1 className={style.name}>{user.name}</h1>
            <div>
              <NavLink to="/mis-datos">
                <button className={style.data}>Cambiar datos</button>
              </NavLink>
            </div>
          </article>
          {!isProvider && <div className={style.service}>
            <NavLink to="/servicio">
              <button>Ofrecer servicio</button>
            </NavLink>
          </div>}
          <div className={style.service}>
            <NavLink to="/calificacionesOwner">
              <button>MIS RESEÑAS</button>
            </NavLink>
          </div>
          {isProvider && <div className={style.service}>
            <NavLink to="/calificacionesProvider">
              <button>RESEÑAS RECIBIDAS</button>
            </NavLink>
          </div>}
        </section>
        <section className={style.mainInfoProfile}>
          <h2>Mis datos</h2>
          <h4 className={style.email}>
            {" "}
            Correo electronico: <span className={style.span}>{user.email}</span>
          </h4>
          <h4 className={style.address}>
            Direccion:{" "}
            <span className={style.span}>
              {userData.address ? userData.address.road : null}
            </span>{" "}
          </h4>
        </section>

        {providerInfo && providerInfo.schedule && providerInfo.service[0] === 'paseo' && <section className={style.mainInfoProfile}>
          <h2 style={{ display: "block" }}>Mis horarios de trabajo</h2>
          <br />
          <br />
          {console.log(providerInfo)}
          <div style={{ display: 'block' }}><h3>lunes</h3>{providerInfo.schedule.lunes.length > 0 && providerInfo.schedule.lunes.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>martes</h3>{providerInfo.schedule.martes.length > 0 && providerInfo.schedule.martes.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>miércoles</h3>{providerInfo.schedule.miercoles.length > 0 && providerInfo.schedule.miercoles.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>jueves</h3>{providerInfo.schedule.jueves.length > 0 && providerInfo.schedule.jueves.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>viernes</h3>{providerInfo.schedule.viernes.length > 0 && providerInfo.schedule.viernes.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>sábado</h3>{providerInfo.schedule.sabado.length > 0 && providerInfo.schedule.sabado.map(x => <div><h4>{x}</h4></div>)}</div>
          <div><h3>domingo</h3>{providerInfo.schedule.domingo.length > 0 && providerInfo.schedule.domingo.map(x => <div><h4>{x}</h4></div>)}</div>
          <NavLink to="/misHorarios">
            <button>CAMBIAR HORARIOS</button>
          </NavLink>
        </section>}


        {providerInfo && providerInfo.schedule && providerInfo.service[0] === 'hospedaje' && <section className={style.mainInfoProfile}>
          <h2 style={{ display: "block" }}>Mis días de trabajo</h2>
          <br />
          <br />
          {console.log(providerInfo)}
          <div>{providerInfo.schedule.lunes && <h3>lunes</h3>}</div>
          <div>{providerInfo.schedule.martes && <h3>martes</h3>}</div>
          <div>{providerInfo.schedule.miercoles && <h3>miércoles</h3>}</div>
          <div>{providerInfo.schedule.jueves && <h3>jueves</h3>}</div>
          <div>{providerInfo.schedule.viernes && <h3>viernes</h3>}</div>
          <div>{providerInfo.schedule.sabado && <h3>sábado</h3>}</div>
          <div>{providerInfo.schedule.domingo && <h3>domingo</h3>}</div>
          <NavLink to="/misHorariosHospedaje">
            <button>CAMBIAR HORARIOS</button>
          </NavLink>
        </section>}
        <section>
          <h2 className={style.boxLabel}>Mis mascotas</h2>
          <div className={style.addPet}>
            <NavLink to="/agregarmascota">
              <button>Agregar mascota</button>
            </NavLink>
            {
              userData.isAdmin ?
                <Link to='/admin/dashboard'>
                  <button>Herramientas de Admin</button>
                </Link>
                : null

            }
          </div>
          <article className={style.petsProfile}>
            {userData.pets && userData.pets.length > 0
              ? userData.pets.map((x, y) => {
                if (x.isActive) {
                  return (
                    <div className={style.petInfo} key={y}>
                      <img src={x.profilePicture} alt="profilePicture" className={style.profilePicture} />
                      <div className={style.petData}>
                        <h2>{x.name}</h2>
                        <h4>Raza: {x.race}</h4>
                        <p className={style.aboutDog}>
                          Sobre {x.name}: {x.description}
                        </p>
                        <button onClick={() => byePet(x.id)}>
                          Eliminar mascota
                        </button>
                      </div>
                    </div>
                  );
                }
              })
              : null}
          </article>
        </section>
        <section>
          <h2>Mis reservas</h2>
          {eventsOwner && eventsOwner.length ?
            eventsOwner.map(x => {
              return (<div>
                <h5>Día del evento: {x.date.day}</h5>
                <h4>Fecha del evento: {x.date.realDate}</h4>
                <p>Nombre del Yump: {x.providerName}</p>
                <p>{x.date.hour}</p>
                <p>{x.eventType}</p>
                <p>Mascota: {x.petName}</p>
              </div>)
            }) : null
          }
          {isProvider && <div><h2>mis servicios acordados</h2></div>}
          {isProvider && eventsProvider ?


            eventsProvider.map(x => {
              return (<div>
                <h5>Día del evento: {x.date.day}</h5>
                <h4>Fecha del evento: {x.date.realDate}</h4>
                <p>Nombre del cliente: {x.ownerName}</p>
                <p>{x.date.hour}</p>
                <p>{x.eventType}</p>
                <p>Pet del cliente: {x.petName}</p>
              </div>)
            })

            : null}
        </section>
      </div>
      <Footer />
    </main>
  );
};
