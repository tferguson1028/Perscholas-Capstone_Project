import React from 'react';

import styles from "./CardHandDisplay.module.css";

function CardHandDisplay(props) 
{
  const { hand = [] } = props;
  return hand.length > 0 ? (
    <div className={styles.CardHandDisplay}> 
      {
        hand.map((card) => 
        {
          return card ? 
            <span className={styles.HandLarge}><img src={card.image} alt="#" /></span> :  
            <span className={styles.HandSmall}><img src="https://deckofcardsapi.com/static/img/back.png" alt="#" /></span>
        })
      }
    </div>
  ) : <></>;
}

export default CardHandDisplay;
