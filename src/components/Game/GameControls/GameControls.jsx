import React, { useState } from 'react';

import * as roomService from "../../../utilities/room-service";
import * as gameService from "../../../utilities/game-service";

function GameControls(props)
{
  const { user, room, setRoom } = props;
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);

  async function leaveRoom()
  {
    const status = await roomService.leaveRoom(room, user);
    if(status)
      setRoom(null);
  }

  async function doAction(actionPayload)
  {
    const response = await gameService.sendAction(room, user, actionPayload);
    response ? setError("") : setError("Wait your turn");
  }

  return (
    <section>
      {error.length > 0 ? <div><p>{error}</p></div> : <></>}
      <div>
        <button onClick={() => { doAction({ action: "check" }); }}>Check</button>
        <button onClick={() => { doAction({ action: "call" }); }}>Call</button>
        <form onSubmit={(event) => { event.preventDefault(); doAction({ action: "raise", amount: value }); }}>
          <button type="submit">Raise</button>
          <input onChange={(event) => { setValue(event.target.value); }} type="number" name="raise" id="raise" required="true"/>
        </form>
        <button onClick={() => { doAction({ action: "fold" }); }}>Fold</button>
        <button onClick={leaveRoom}>Leave</button>
      </div>
    </section>
  );
}

export default GameControls;
