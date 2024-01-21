import React from 'react';
import CardHandDisplay from '../CardHandDisplay/CardHandDisplay';

function GameVisuals(props) 
{
  const { user, gameData = { data: { cardData: { piles: {} } }, playerCards: [], community: [] } } = props;
  const { data, playerCards, community } = gameData;
  return (
    <div>
      <div className="pot-and-bets">
        <div>
          <span>&#128176;</span>
          <span>POT {data.pot}</span>
        </div>
        <div>
          <span>&#x1FA99;</span>
          <span>BET {data.lastBet}</span>
        </div>
        <div>TURN {data.currentTurn}</div>
      </div>
      <div className="community-pile">
        <CardHandDisplay hand={community} />
      </div>
      <div className="player-hands">
        <div className='player'>
          <CardHandDisplay hand={playerCards} />
        </div>
        {
          (Object.keys(data.cardData.piles)).map((pile) =>
          {
            if(pile === user || pile === "community") return <></>;

            // https://stackoverflow.com/a/28599347
            return (
              <CardHandDisplay key={pile} hand={Array.apply(null, Array(data.cardData.piles[pile].remaining)).map(() => {})} />
            );
          })
        }
      </div>
    </div>
  );
}

export default GameVisuals;
