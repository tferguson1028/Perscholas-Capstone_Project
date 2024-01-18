import React from 'react'

import "./Logo.css";

function Logo()
{
  return (
    <div className='Logo'>
      <div className='logo-image'>
        <span className="logo-suit">♠</span>
        <span className="logo-suit">♥</span>
        <span className="logo-suit">♣</span>
        <span className="logo-suit">♦</span>
      </div>
      <h1>Card Site</h1>
    </div>
  );
}

export default Logo;
