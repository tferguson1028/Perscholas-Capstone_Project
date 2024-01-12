import React from "react";
import { Link } from "react-router-dom";
import * as userService from '../utilities/users-service'
function Navbar({user ,setUser}) {

  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }
  return (
    <>
      <nav style={{ justifyContent: "space-evenly", display: "flex" }}>

      <div style={{justifyContent:'space-around'}}>
        <p style={{margin:'1em'}}>Welcome {user.name}, </p><hr/>
        <p style={{margin:'1em'}}> Logged In : {user.email}</p>
        <Link to="" onClick={handleLogOut}><button>Logout</button></Link>
      </div>

        <Link to="/orders">Order History</Link>

        <Link to="/orders/new">New Order</Link>
      </nav>
    </>
  );
}

export default Navbar;
