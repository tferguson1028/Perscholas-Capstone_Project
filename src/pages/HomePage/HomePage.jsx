import React from 'react';

import * as userService from "../../utilities/users-service";

function HomePage(props)
{
  const { user = {}, setUser = () => {} } = props;
  
  function handleLogOut() 
  {
    // Delegate to the users-service
    // Update state will also cause a re-render
    userService.logOut();
    setUser(null);
  }
  
  return (
    <main>
      <div>HomePage</div>
      <button onClick={handleLogOut}>LOG OUT</button>
    </main>
  );
}

export default HomePage;
