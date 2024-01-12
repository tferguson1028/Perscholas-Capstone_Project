import React from 'react'
import * as usersService from "../../utilities/users-service";

import styles from "../../styles/UserLogout.module.css";

function CheckTokenLogout()
{
  async function handleCheckToken()
  {
    let exp = await usersService.checkToken();
    alert(exp);
  }

  return (
    <div className={styles.UserLogOut}>
      <button className="btn-sm" onClick={handleCheckToken}>Check Login Expiration</button>
    </div>
  );
}

export default CheckTokenLogout;
