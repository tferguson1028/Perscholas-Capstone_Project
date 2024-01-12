import React from 'react'

import Logo from '../Logo/Logo';
import UserLogOut from '../UserLogOut/UserLogOut';
import CheckTokenLogout from '../CheckTokenLogout/CheckTokenLogout';

import styles from "../../styles/Sidebar.module.css";

function Sidebar(props) 
{
  const { user = {}, setUser = () => {}, children = [] } = props;
  
  return (
    <aside className={styles.aside}>
      <Logo />
      { children }
      <div>
        <UserLogOut user={user} setUser={setUser} />
        <CheckTokenLogout />
      </div>
    </aside>
  );
}

export default Sidebar;
