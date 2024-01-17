import React from 'react'
import * as usersService from "../../utilities/users-service";

function CheckTokenLogout()
{
  async function handleCheckToken()
  {
    let exp = await usersService.checkToken();
    alert(exp);
  }

  return (
    <div>
      <button className="btn-sm" onClick={handleCheckToken}>Check Login Expiration</button>
    </div>
  );
}

export default CheckTokenLogout;
