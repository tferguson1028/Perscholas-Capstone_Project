import React from 'react';

function CardHandDisplay(props) 
{
  const { hand = [] } = props;
  return (
    <div>
      {
        hand.map((card) => 
        { 
          return card === null ? 
            <img src={card.image} alt="#" /> :  
            <img src="https://deckofcardsapi.com/static/img/back.png" alt="#" />
        })
      }
    </div>
  );
}

export default CardHandDisplay;
