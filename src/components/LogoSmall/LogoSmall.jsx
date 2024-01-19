import React from 'react'

// import styles from "./Logo.module.css";
import styles from "./LogoSmall.module.css";

function LogoSmall()
{
  return (
    <div className={styles.Logo}>
      <div className={styles.LogoImage}>
        <span className={styles.LogoSuit}>♠</span>
        <span className={styles.LogoSuit}>♥</span>
        <span className={styles.LogoSuit}>♣</span>
        <span className={styles.LogoSuit}>♦</span>
      </div>
      <h1>Card Site</h1>
    </div>
  );
}

export default LogoSmall;
