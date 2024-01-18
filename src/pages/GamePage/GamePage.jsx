import React from 'react';
import GameVisuals from '../../components/Game/GameVisuals/GameVisuals';
import GameControls from '../../components/Game/GameControls/GameControls';

function GamePage(props) 
{
  const { user, room, setRoom } = props;

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
