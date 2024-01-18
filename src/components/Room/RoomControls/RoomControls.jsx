import React from 'react';

import * as roomService from "../../../utilities/room-service";
import { useNavigate } from 'react-router-dom';

function RoomControls(props)
{
  const { user, room, setRoom, setError } = props;
  const navigate = useNavigate();

  async function startGame()
  {
    const status = await roomService.startGame(room, user);
    
    // https://stackoverflow.com/a/40380010
    if(status)
    {
      setError("");
      navigate(`/game/${room}`);
    }else
    {
      setError("Unable to start game");
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
