import React from 'react'

import * as userService from '../../utilities/users-service';
import styles from "../../styles/UserLogout.module.css";

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
    <div className={styles.UserLogOut}>
      <div>{user.name}</div>
      <div className={styles.email}>{user.email}</div>
      <button className="btn-sm" onClick={handleLogOut}>LOG OUT</button>
    </div>
  );
}

export default UserLogOut;
