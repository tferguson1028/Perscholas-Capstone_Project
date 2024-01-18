import React from 'react';

import * as roomService from "../../../utilities/room-service";

function GameControls(props)
{
  const { user, room, setRoom } = props;

  async function leaveRoom()
  {
    const status = await roomService.leaveRoom(room, user);
    if(status)
      setRoom(null);
  }

  return (
    <div>
      <button>Call</button>
      <button>Check</button>
      <button>Raise</button>
      <button>Fold</button>
      <button onClick={leaveRoom}>Leave</button>
    </div>
  );
}

export default GameControls;
