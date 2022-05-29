import React from "react";
import InContainer from "../../GlobalCss/InContainer.module.css";
import styles from "../Team/Team.module.css";
import TeamCard from "./TeamCard";

const Team = () => {
  return (
    <div className={InContainer.container}>
      <h2 className={styles.teamTitle}>Nosotros somos Pettin</h2>

      <div className={styles.wrapper}>
        <TeamCard
          name="Leo"
          location="La Plata, Buenos Aires"
          contact="012345678"
          img="/assets/img/leo.png"
        />
        <TeamCard
          name="Mathe"
          location="La Matanza, Buenos Aires"
          contact="012345678"
          img="/assets/img/mate.png"
        />
        <TeamCard
          name="Sabri"
          location="Villa Ballester, Buenos Aires"
          contact="012345678"
          img="/assets/img/sabri.png"
        />
        <TeamCard
          name="Alan"
          location="La Plata, Buenos Aires"
          contact="012345678"
          img="/assets/img/alan.png"
        />
        <TeamCard
          name="Frano"
          location="Baradero, Buenos Aires"
          contact="012345678"
          img="/assets/img/fran.png"
        />
      </div>
    </div>
  );
};

export default Team;
