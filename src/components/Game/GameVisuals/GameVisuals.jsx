import React from 'react';
import CardHandDisplay from '../CardHandDisplay/CardHandDisplay';

function GameVisuals(props) 
{
  const { user, gameData = { data: { cardData: {piles: {}}}, playerCards: [], community: [] } } = props;
  const { data, playerCards, community } = gameData;
  return (
    <section>
      <div className="pot-and-bets">{JSON.stringify(data)}</div>
      <div className="community-pile">
        <CardHandDisplay hand={community} />
      </div>
      <div className="player-hands">
        <div className='player'>
          <CardHandDisplay hand={playerCards} />
        </div>
        {
          // (Object.keys(data.cardData.piles)).map((pile) =>
          // {
          //   if(pile === user || pile === "community") return <></>;
          //   
          //   // https://stackoverflow.com/a/28599347
          //   return (
          //     <CardHandDisplay hand={Array.apply(null, Array(data.cardData.piles[pile])).map(() => {})} />
          //   );
          // })
        }
      </div>
    </section>
  );
}

export default GameVisuals;
