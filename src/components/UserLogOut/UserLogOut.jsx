import React from 'react';

import * as userService from '../../utilities/users-service';

function UserLogOut(props)
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
    <button onClick={handleLogOut}>
      <div>{user.name}</div>
      {props.children}
    </button>
  );
}

export default UserLogOut;
