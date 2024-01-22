import React, { useState } from 'react';

import * as roomService from "../../../utilities/room-service";
import * as gameService from "../../../utilities/game-service";

import styles from "./GameControls.module.css";

function GameControls(props)
{
  const { user, room, setRoom, pot = 0, lastBet = 0 } = props;
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
    if(response)
      setError("");
    else
    {
      setError("Wait your turn");
      setTimeout(() => { setError(""); }, 5000);
    }
  }

  function handleChange(event)
  {
    event.preventDefault();
    setValue(event.target.value);
  }

  function handleSubmit(event)
  {
    event.preventDefault();
    doAction({ action: "raise", amount: Number(value) });
  }

  return (
    <section className={styles.GameControls}>
      {error.length > 0 ? <p className='ErrorMessage'>{error}</p> : <></>}
      <div>
        { 
          lastBet === 0 ?
          (
            pot === 0 ?
            <></> :
            <button onClick={() => { doAction({ action: "check" }); }}>Check</button>
          ) :
          <button onClick={() => { doAction({ action: "call" }); }}>Call</button>
        }
        <form onSubmit={handleSubmit}>
          <button type="submit">Raise</button>
          <input onChange={handleChange} type="number" name="raise" id="raise" min="0" required="true" />
        </form>
          { pot > 0 ? <button onClick={() => { doAction({ action: "fold" }); }}>Fold</button> : <></> }
        <button onClick={leaveRoom}>Leave</button>
      </div>
    </section>
  );
}

export default GameControls;
