import React from 'react'
import InContainer from '../../GlobalCss/InContainer.module.css'
import styles from '../Team/Team.module.css'
import TeamCard from './TeamCard'

const Team = () => {
  return (
    <div className={InContainer.container}>
        <h2 className={styles.teamTitle}>Lorem, ipsum.</h2>

        <div className={styles.wrapper}>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
            <TeamCard/>
        </div>
    </div>  
  )
}

export default Team