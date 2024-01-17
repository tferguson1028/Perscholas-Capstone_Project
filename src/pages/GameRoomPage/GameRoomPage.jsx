import React from 'react';
import GameVisuals from '../../components/Game/GameVisuals/GameVisuals';
import GameControls from '../../components/Game/GameControls/GameControls';

function GameRoom(props) 
{
  const { room, user, setUser } = props;

  return (
    <main>
      <header>
        <h1>Room {room}</h1>
      </header>
      <GameVisuals />
      <GameControls />
    </main>
  );
}

export default GameRoom;
