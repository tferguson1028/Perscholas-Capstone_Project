import React, { useState } from 'react';

import * as userService from "../../utilities/users-service";
import * as roomService from "../../utilities/room-service";

function HomePage(props)
{
  const { user = {}, setUser = () => {}, setRoom = () => {} } = props;
  const [ joinID, setJoinID ] = useState();
  
  function handleLogOut() 
  {
    // Delegate to the users-service
    // Update state will also cause a re-render
    userService.logOut();
    setUser(null);
  }
  
  function handleChange(event)
  {
    event.preventDefault();
    setJoinID(event.target.value);
  }
  
  async function handleRoomCreate()
  {
    const roomID = await roomService.createRoom(user);
    setRoom(roomID);
  }
  
  async function handleRoomJoin(event)
  {
    event.preventDefault();
    
    const roomID = await roomService.joinRoom(joinID, user);
    setRoom(roomID);
  }
  
  return (
    <main>
      <div>HomePage</div>
      <section>
      </section>
      <section>
        <button onClick={handleRoomCreate}>Create Room</button>
        <form onSubmit={handleRoomJoin}>
          <button type="submit">Join Room</button>
          <input type="text" name="room" id="room" onChange={handleChange} />
        </form>
        <button onClick={handleLogOut}>LOG OUT</button>
      </section>
    </main>
  );
}

export default HomePage;
