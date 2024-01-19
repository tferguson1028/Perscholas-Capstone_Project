import React, { useEffect, useState } from 'react';
import GameVisuals from '../../components/Game/GameVisuals/GameVisuals';
import GameControls from '../../components/Game/GameControls/GameControls';

import * as gameService from "../../utilities/game-service";

function GamePage(props) 
{
  const { user, room, setRoom } = props;
  const [gameData, setGameData] = useState(null);

  useEffect(() => { updateGame(); }, [gameData]);
  
  async function updateGame()
  {
    const updateHappened = await gameService.awaitUpdate(room);
    if(updateHappened)
    {
      alert("Response: ", updateHappened);
      let data = await gameService.updateGame(room); 
      setGameData(data);
    }else
      updateGame();
  }
  
  return (
    <main>
      <header>
        <h1>Game {room}</h1>
      </header>
      <GameVisuals />
      <GameControls user={user} room={room} setRoom={setRoom} />
    </main>
  );
}

export default GamePage;
