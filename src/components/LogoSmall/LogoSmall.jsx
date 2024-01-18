import React from 'react'

// import styles from "./Logo.module.css";
import "./LogoSmall.css";

function Logo()
{
  return (
    <div className='Logo'>
      <div className='logo-image'>
        <span className="logo-suit">♠</span>
        <span className="logo-suit">♡</span>
        <span className="logo-suit">♣</span>
        <span className="logo-suit">♢</span>
      </div>
      <h1>Card Site</h1>
    </div>
  );
}

export default Logo;
