import React from 'react';
import CardHandDisplay from '../CardHandDisplay/CardHandDisplay';

import styles from "./GameVisuals.module.css";

function GameVisuals(props) 
{
  const { user, gameData = { data: { cardData: { piles: {} } }, playerCards: [], community: [] } } = props;
  const { data, playerCards, community } = gameData;
  return (
    <div className={styles.GameVisuals}>
      <section className={styles.GameInfo}>
        <div>
          <span>&#128176;POT</span>
          <span>{data.pot}</span>
        </div>
        <span className='spacer'></span>
        <div>
          <span>&#x1FA99;BET</span>
          <span>{data.lastBet}</span>
        </div>
        <span className='spacer'></span>
        <div>
          <span>&#x1F449;TURN</span>
          <span>
            {data.currentTurn}
          </span>
        </div>
      </section>
      <div className={styles.CommunityPile}>
        <CardHandDisplay hand={community} />
      </div>
      <div className={styles.PlayerHands}>
        <div className='player'>
          <CardHandDisplay hand={playerCards} />
        </div>
        {
          (Object.keys(data.cardData.piles)).map((pile) =>
          {
            if(pile === user._id || pile === "community") return <></>;
            return (
              // Array statement: https://stackoverflow.com/a/28599347
              <CardHandDisplay key={pile} hand={Array.apply(null, Array(data.cardData.piles[pile].remaining)).map(() => {})} />
            );
          })
        }
      </div>
    </div>
  );
}

export default GameVisuals;
