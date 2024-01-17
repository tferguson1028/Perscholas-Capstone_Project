import React from 'react';
import GameVisuals from '../../components/Game/GameVisuals/GameVisuals';
import GameControls from '../../components/Game/GameControls/GameControls';

function GameRoom(props) 
{
  const { user, room, setRoom } = props;

  return (
    <main>
      <header>
        <h1>Room {room}</h1>
      </header>
      <GameVisuals />
      <GameControls user={user} room={room} setRoom={setRoom} />
    </main>
  );
}

export default GameRoom;
