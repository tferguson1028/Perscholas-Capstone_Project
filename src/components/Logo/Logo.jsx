import React from 'react';

import styles from "./Logo.module.css";

function Logo()
{
  return (
    <div className={styles.Logo}>
      <div className={styles.LogoImage}>
        <span className={styles.LogoSuit}>♠</span>
        <span className={styles.LogoSuit}>♥</span>
        <span className={styles.LogoSuit}>♣</span>
        <span className={styles.LogoSuit}>♦</span>
      </div>
      <h1 style={{ fontFamily: "Georgia" }}>PLAY ACE</h1>
    </div>
  );
}

export default Logo;
