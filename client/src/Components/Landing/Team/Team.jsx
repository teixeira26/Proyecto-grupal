import React from "react";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../Team/Team.module.css";
import TeamCard from "./TeamCard";

const Team = () => {
  return (
    <div className={InContainer.container}>
      <h2 className={styles.teamTitle}>Nosotros somos yumPaw</h2>

      <div className={styles.wrapper}>
        <TeamCard
          name="Leo"
          location="La Plata, Buenos Aires"
          contact="+54 9 221 558-7947"
          img="/assets/img/leo.png"
          link='https://github.com/zm0x7b9'
          li='https://www.linkedin.com/in/zm0x7b9/'
        />
        <TeamCard
          name="Mathe"
          location="La Matanza, Buenos Aires"
          contact="+54 9 11 6569-3049"
          img="/assets/img/mate.png"
          link='https://github.com/teixeira26'
          li='https://www.linkedin.com/in/matheus-teixeira26/'
        />
        <TeamCard
          name="Sabri"
          location="Villa Ballester, Buenos Aires"
          contact="+54 9 11 7361-4364"
          img="/assets/img/sabri.png"
          link='https://github.com/Sabri-Rapa'
          li='https://www.linkedin.com/in/sabrina-helena-rapa/'
        />
        <TeamCard
          name="Alan"
          location="La Plata, Buenos Aires"
          contact="+54 9 221 6176-057"
          img="/assets/img/alan.png"
          link='https://github.com/alantopczylo'
          li='https://www.linkedin.com/in/alan-topczylo-1b5620203/'
        />
        <TeamCard
          name="Frano"
          location="Baradero, Buenos Aires"
          contact="+54 9 11 2285-7609"
          img="/assets/img/fran.png"
          link='https://github.com/franodangelo'
          li='https://www.linkedin.com/in/franco-dangelo/'
        />
      </div>
    </div>
  );
};

export default Team;
