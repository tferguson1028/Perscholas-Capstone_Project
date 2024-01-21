import React, { useEffect, useState } from 'react';
import GameVisuals from '../../components/Game/GameVisuals/GameVisuals';
import GameControls from '../../components/Game/GameControls/GameControls';

import * as gameService from "../../utilities/game-service";

function GamePage(props) 
{
  const { user, room, setRoom } = props;
  const [gameData, setGameData] = useState({ data: { cardData: {piles: {}}}, playerCards: [], community: [] });

  useEffect(() => { startGame(); }, []);
  useEffect(() =>
  {
    updateGame();
    console.log(gameData);
    alert(JSON.stringify(gameData));
  }, [gameData]);

  async function startGame() { gameService.startGame(room); }

  async function updateGame()
  {
    const updateHappened = await gameService.awaitUpdate(room);
    if(updateHappened)
    {
      // alert("Response: ", updateHappened);
      let data = await gameService.updateGame(room);
      let playerCards = await gameService.getCards(room, user);
      let community = await gameService.getCards(room, { _id: "community" });

      console.log("data: ", data);
      console.log("playerCards: ", playerCards);
      console.log("community: ", community);

      setGameData({ data, playerCards: playerCards, community });
    } else
    {
      updateGame();
    }
  }

  return (
    <main>
      <header>
        <h1>Game {room}</h1>
      </header>
      <GameVisuals gameData={gameData} />
      <GameControls user={user} room={room} setRoom={setRoom} />
    </main>
  );
}

export default GamePage;
