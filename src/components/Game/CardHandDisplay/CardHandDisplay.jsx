import React from 'react';

function CardHandDisplay(props) 
{
  const { hand = [] } = props;
  return (
    <div>
      {
        hand.map((card) => 
        {
          return card ? 
            <span><img src={card.image} alt="#" /></span> :  
            <span><img src="https://deckofcardsapi.com/static/img/back.png" alt="#" /></span>
        })
      }
    </div>
  );
}

export default CardHandDisplay;
