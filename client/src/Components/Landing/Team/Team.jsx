import React from 'react'
import InContainer from '../../GlobalCss/InContainer.module.css'
import styles from '../Team/Team.module.css'
import TeamCard from './TeamCard'

const Team = () => {
  return (
    <div className={InContainer.container}>
        <h2 className={styles.teamTitle}>Nosotros somos Pettin</h2>

        <div className={styles.wrapper}>
            <TeamCard name='Sabri' location='Villa Ballester, Buenos Aires'/>
            <TeamCard name='Leo' location='La Plata, Buenos Aires'/>
            <TeamCard name='Mathe' location='La Matanza, Buenos Aires'/>
            <TeamCard name='Alan' location='La Plata, Buenos Aires'/>
            <TeamCard name='Frano' location='Baradero, Buenos Aires'/>
            <TeamCard name='La tortuguita' location='Hogwarts'/>
        </div>
    </div>  
  )
}

export default Team