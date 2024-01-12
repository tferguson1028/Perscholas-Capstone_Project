import React from 'react'
import {Link} from "react-router-dom";
import * as userService from '../../utilities/users-service';

function UserLogOut()
{
  function handleLogOut(props) 
  {
    const { setUser = () => {} } = props;
    // Delegate to the users-service
    // Update state will also cause a re-render
    userService.logOut();
    setUser(null);
  }
  
  return (
    <>
      <Link to="" onClick={handleLogOut}><button>Logout</button></Link>
    </>
  )
}

export default UserLogOut;
