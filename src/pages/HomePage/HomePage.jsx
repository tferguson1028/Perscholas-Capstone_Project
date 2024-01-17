import React from 'react';

import * as userService from "../../utilities/users-service";

function HomePage(props)
{
  const { user = {}, setUser = () => {}, setRoom = () => {} } = props;
  
  function handleLogOut() 
  {
    // Delegate to the users-service
    // Update state will also cause a re-render
    userService.logOut();
    setUser(null);
  }
  
  function handleCreate(event)
  {
  }
  
  function handleJoin(event)
  {
  }
  
  return (
    <main>
      <div>HomePage</div>
      <button onClick={handleCreate}>Create Room</button>
      <form onSubmit={handleJoin}>
        <button type="submit">Join Room</button>
        <input type="text" name="room" id="room" />
      </form>
      <button onClick={handleLogOut}>LOG OUT</button>
    </main>
  );
}

export default HomePage;
