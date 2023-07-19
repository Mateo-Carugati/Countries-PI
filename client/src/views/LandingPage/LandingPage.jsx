import React from 'react';
import styles from './LandingPage.module.css'; 
import tierra from '../../assets/tierra.mp4'; 

function LandingPage() {
  return (
    <div className={styles['landing-page']}> 
      <video className={styles['video-bg']} autoPlay muted loop> 
        <source src={tierra} type="video/mp4" />
      </video>
      <div className={styles['content']}> 
        <h1 className={styles['title']}>C O U N T R I E S &nbsp; A P I</h1> 
        <a href="/home" className={styles['cta-button']}>INGRESAR</a>
      </div>
    </div>
  );
}

export default LandingPage;
