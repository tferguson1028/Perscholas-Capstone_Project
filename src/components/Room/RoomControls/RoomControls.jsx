import React from 'react';

import * as roomService from "../../../utilities/room-service";

function RoomControls(props)
{
  const { user, room, setRoom } = props;

  async function startGame()
  {
    const status = await roomService.startGame(room, user);
    if(status)
    {
      
    }
  }

  async function leaveRoom()
  {
    const status = await roomService.leaveRoom(room, user);
    if(status)
      setRoom(null);
  }

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      <button onClick={leaveRoom}>Leave Room</button>
    </div>
  );
}

export default RoomControls;
