import React, { useEffect, useState } from "react";
import NavBarShop from "../../Components/NavBar/NavBarShop";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getOwners, getPets } from "../../redux/actions/ownProvActions";
import styleContainer from "../../Components/GlobalCss/InContainer.module.css";
import style from "./Profile.module.css";
import Swal from "sweetalert2";
import InContainer from "../../Components/GlobalCss/InContainer.module.css";

export default function Profile() {
  const pets = useSelector((state) => state.pets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUser] = useState({});
  const { user, isAuthenticated } = useAuth0();
  const [isProvider, setIsProvider] = useState(false);
  const [providerInfo, setProviderInfo] = useState();
  const [eventsProvider, setEventsProvider] = useState();
  const [eventsOwner, setEventsOwner] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://proyecto-grupal.herokuapp.com/owners")
        .then((x) => {
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
            isAdmin: userdb.isAdmin,
          });
          console.log("userdb", userdb);
        })
        .then(() => {
          return axios.get("https://proyecto-grupal.herokuapp.com/events");
        })
        .then((x) => {
          setEventsOwner(x.data.filter((x) => x.ownerEmail === user.email));
          setEventsProvider(
            x.data.filter((x) => x.providerEmail === user.email)
          );
        });
    }
  }, [user, isAuthenticated, pets, dispatch]);

  useEffect(() => {
    if (user) {
      axios
        .get("https://proyecto-grupal.herokuapp.com/providers?filter=&order=ASC")
        .then((x) => {
          let providerCheck = x.data.find((x) => x.email === user.email);
          console.log(providerCheck);
          if(providerCheck){
            setIsProvider(true);
          }
          
          if (providerCheck && providerCheck.service === "paseo") {
            providerCheck = {
              ...providerCheck,
              schedule: providerCheck.schedule.map((x) => JSON.parse(x)),
            };
            setIsProvider(true);
            setProviderInfo(providerCheck);
            console.log(providerCheck);
          }
        });
    }
  }, [user]);

  async function byePet(id) {
    await axios.delete(`https://proyecto-grupal.herokuapp.com/pets/${id}`, { isActive: false });
    dispatch(getPets());
  }

  function myServices() {
    navigate("/mis-servicios");
  }

  return (
    <main>
      <NavBarShop />
      <div className={styleContainer.container}>
        <div className={InContainer.container}>
          <section className={style.infoProfile}>
            <img src={userData.picture} alt="profilePicture" />
            <article className={style.profile}>
              <div className={style.editarperfil}>
                <Link to="/mis-datos">
                  <button className="terciaryButton">Editar perfil</button>
                </Link>
              </div>
              <div className={style.textContent}>
                <h1 className={style.name}>{user.name}</h1>
              </div>
              <h4 className={style.email}>
                {" "}
                E-mail: <span className={style.span}>{user.email}</span>
              </h4>
              <h4 className={style.address}>
                Dirección:{" "}
                <span className={style.span}>
                  {userData.address ? userData.address.road : null},{" "}
                  {userData.address ? userData.address.state : null},{" "}
                  {userData.address ? userData.address.city : null}
                </span>{" "}
              </h4>
              <div className={style.buttonContainer}>
                <div className={style.service}>
                  <Link to="/compras-realizadas">
                    <button className="secondaryButton">Mis compras</button>
                  </Link>
                </div>

                <div className={style.service}>
                  <Link to="/calificacionesOwner">
                    <button className="secondaryButton">
                      Reseñas enviadas
                    </button>
                  </Link>
                </div>

                {isProvider && (
                  <div className={style.service}>
                    <Link to="/calificacionesProvider">
                      <button className="primaryButton">
                        Reseñas recibidas
                      </button>
                    </Link>
                  </div>
                )}

                {
                  <div className={style.service}>
                    <button className="primaryButton" onClick={myServices}>
                      Servicios contratados
                    </button>
                  </div>
                }
                {!isProvider && (
                  <div className={style.service}>
                    <Link to="/servicio">
                      <button className="primaryButton">
                        Ofrecer servicio
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </section>
          {providerInfo &&
            providerInfo.schedule &&
            providerInfo.service[0] === "hospedaje" && (
              <section className={style.mainInfoProfile}>
                <h2 className={style.dayTitle} style={{ display: "block" }}>
                  Mis días de trabajo
                </h2>

                <br />
                <br />
                {console.log(providerInfo)}
                <div>{providerInfo.schedule.lunes && <h3>lunes</h3>}</div>
                <div>{providerInfo.schedule.martes && <h3>martes</h3>}</div>
                <div>
                  {providerInfo.schedule.miercoles && <h3>miércoles</h3>}
                </div>
                <div>{providerInfo.schedule.jueves && <h3>jueves</h3>}</div>
                <div>{providerInfo.schedule.viernes && <h3>viernes</h3>}</div>
                <div>{providerInfo.schedule.sabado && <h3>sábado</h3>}</div>
                <div>{providerInfo.schedule.domingo && <h3>domingo</h3>}</div>
                <Link to="/misHorariosHospedaje">
                  <button className="terciaryButton">Editar horarios</button>
                </Link>
              </section>
            )}
          {providerInfo && providerInfo.service[0] === "hospedaje" && (
            <div>
              <h3 className={style.hogar}>Mi dulce hogar</h3>
              <div className={style.buttonPhoto}>
                <input
                  className="secondaryButton"
                  type="button"
                  value="Agregar Foto"
                  onClick={() => navigate("/agregar-foto")}
                />
              </div>

              <div className={style.housingGrid}>
                {providerInfo.housingPhotos &&
                  providerInfo.housingPhotos.map((x, y) => {
                    return (
                      <img
                        src={x}
                        key={y}
                        alt={y}
                        className={style.housePhoto}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          <section className={style.petSection}>
            <div className={style.addPet}>
              <h2 className={style.boxLabel}>Mis mascotas</h2>
            </div>
            <article className={style.petsProfile}>
              {userData.pets && userData.pets.length > 0
                ? userData.pets.map((x, y) => {
                    if (x.isActive) {
                      return (
                        <div className={style.petInfo} key={y}>
                          <div className={style.profilePictureCont}>
                            <img
                              src={x.profilePicture}
                              alt="profilePicture"
                              className={style.profilePicture}
                            />
                          </div>
                          <div className={style.petData}>
                            <h2 className={style.titulo}>{x.name}</h2>
                            <h4 className={style.race}>
                              {" "}
                              Raza: <span className={style.span}>{x.race}</span>
                            </h4>
                            <p className={style.aboutDog}>
                              Sobre {x.name}:{" "}
                              <span className={style.span}>
                                {x.description}
                              </span>
                            </p>
                          </div>
                          <button
                            className="secondaryButton"
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "¿Estás seguro que querés eliminar a esta mascota?",
                                showDenyButton: true,
                                confirmButtonText: "Eliminar",
                                denyButtonText: `Cancelar`,
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  Swal.fire(
                                    "¡La mascota fue eliminada!",
                                    "",
                                    "success"
                                  );
                                  byePet(x.id);
                                } else if (result.isDenied) {
                                  Swal.fire("", "", "info");
                                }
                              });
                            }}
                          >
                            X
                          </button>
                        </div>
                      );
                    }
                  })
                : null}
              <Link to="/agregarmascota">
                <button className="primaryButton">Agregar mascota</button>
              </Link>
            </article>
          </section>

          {/* {providerInfo&& providerInfo.schedule && providerInfo.service[0] === 'paseo' &&<section className={style.mainInfoProfile}>
          <h2 style={{display:"block"}}>Mis horarios de trabajo</h2>
          <br/>
          <br/>
          {/* {console.log(providerInfo)}
          <div style={{display:'block'}}><h3>lunes</h3>{providerInfo.schedule.lunes.length>0 &&providerInfo.schedule.lunes.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>martes</h3>{providerInfo.schedule.martes.length>0&&providerInfo.schedule.martes.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>miércoles</h3>{providerInfo.schedule.miercoles.length>0&&providerInfo.schedule.miercoles.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>jueves</h3>{providerInfo.schedule.jueves.length>0&&providerInfo.schedule.jueves.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>viernes</h3>{providerInfo.schedule.viernes.length>0&&providerInfo.schedule.viernes.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>sábado</h3>{providerInfo.schedule.sabado.length>0&&providerInfo.schedule.sabado.map(x=><div><h4>{x}</h4></div>)}</div>
          <div><h3>domingo</h3>{providerInfo.schedule.domingo.length>0&&providerInfo.schedule.domingo.map(x=><div><h4>{x}</h4></div>)}</div>
      
        </section>} */}
          {providerInfo &&
            providerInfo.schedule &&
            providerInfo.service[0] === "hospedaje" && (
              <section className={style.mainInfoProfile}>
                <h2 style={{ display: "block" }}>Mis días de trabajo</h2>
                <br />
                <br />
                {console.log(providerInfo)}
                <div>{providerInfo.schedule.lunes && <h3>lunes</h3>}</div>
                <div>{providerInfo.schedule.martes && <h3>martes</h3>}</div>
                <div>
                  {providerInfo.schedule.miercoles && <h3>miércoles</h3>}
                </div>
                <div>{providerInfo.schedule.jueves && <h3>jueves</h3>}</div>
                <div>{providerInfo.schedule.viernes && <h3>viernes</h3>}</div>
                <div>{providerInfo.schedule.sabado && <h3>sábado</h3>}</div>
                <div>{providerInfo.schedule.domingo && <h3>domingo</h3>}</div>
                <Link to="/misHorariosHospedaje">
                  <button>Editar horarios</button>
                </Link>
              </section>
            )}

          {providerInfo &&
            providerInfo.schedule &&
            providerInfo.service[0] === "paseo" && (
              <section className={style.mainInfoProfile}>
                <h2 style={{ display: "block" }}>Mis días de trabajo</h2>
                <br />
                <br />
                {console.log(providerInfo.schedule)}
                <div>
                  {providerInfo.schedule[0] &&
                    providerInfo.schedule[0].lunes &&
                    providerInfo.schedule[0].lunes.map((x) => (
                      <div>
                        <h3>Lunes</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[1] &&
                    providerInfo.schedule[1].martes &&
                    providerInfo.schedule[1].martes.map((x) => (
                      <div>
                        <h3>Martes</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[2] &&
                    providerInfo.schedule[2].miercoles &&
                    providerInfo.schedule[2].miercoles.map((x) => (
                      <div>
                        <h3>Miercoles</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[3] &&
                    providerInfo.schedule[3].jueves &&
                    providerInfo.schedule[3].jueves.map((x) => (
                      <div>
                        <h3>Jueves</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[4] &&
                    providerInfo.schedule[4].viernes &&
                    providerInfo.schedule[4].viernes.map((x) => (
                      <div>
                        <h3>Viernes</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[5] &&
                    providerInfo.schedule[5].sabado &&
                    providerInfo.schedule[5].sabado.map((x) => (
                      <div>
                        <h3>Sabado</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <div>
                  {providerInfo.schedule[6] &&
                    providerInfo.schedule[6].domingo &&
                    providerInfo.schedule[6].domingo.map((x) => (
                      <div>
                        <h3>Domingo</h3>
                        <p>{x}</p>
                      </div>
                    ))}
                </div>
                <Link to="/misHorarios">
                  <button>Editar horarios</button>
                </Link>
              </section>
            )}
          <section>
            <div className={style.addPet}></div>
            <article className={style.petsProfile}>
              {userData.pets && userData.pets.length > 0
                ? userData.pets.map((x, y) => {
                    if (x.isActive) {
                      return (
                        <div>
                          {/* <h3>Mascota: {x.petName}</h3>
                          <h4>
                            {x.eventType} con {x.providerName}
                          </h4> */}
                          {/* <p>
                        Fecha del evento: {x.date.day} {x.date.realDate} -{" "}
                        {x.date.hour}
                      </p> */}
                        </div>
                      );
                    }
                  })
                : null}
              {isProvider && (
                <div>
                  <h2>Mis servicios acordados</h2>
                </div>
              )}
            </article>

            {isProvider && eventsProvider
              ? eventsProvider.map((x) => {
                  return (
                    <div>
                      <h3>
                        {x.eventType} acordado con {x.ownerName}
                      </h3>
                      <p>Mascota: {x.petName}</p>
                      <p>
                        Fecha del evento: {x.date.day} {x.date.realDate} -{" "}
                        {x.date.hour}
                      </p>
                    </div>
                  );
                })
              : null}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
