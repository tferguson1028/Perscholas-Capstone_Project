import React, { useState } from 'react';

import * as userService from "../../utilities/users-service";
import * as roomService from "../../utilities/room-service";

import Logo from '../../components/Logo/Logo';

import styles from "./HomePage.module.css";

function HomePage(props)
{
  const { user = {}, setUser = () => {}, setRoom = () => {} } = props;
  const [joinID, setJoinID] = useState();

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
    console.log(roomID);
    setRoom(roomID);
  }

  async function handleRoomJoin(event)
  {
    event.preventDefault();

    const roomID = await roomService.joinRoom(joinID, user);
    setRoom(roomID);
  }

  return (
    <main className={styles.HomePage}>
      <Logo />
      <section className={styles.RoomList}>
      </section>
      <section className={styles.UserDisplay}>
        <p>{user.name}</p>
        <p>
          <span>Tokens</span>
          <div>
            <span>&#x1FA99;</span>
            {user.money}
          </div>
        </p>
        <button>Edit User</button>
      </section>
      <section className={styles.InputSection}>
        <button onClick={handleRoomCreate}>Create Room</button>
        <form onSubmit={handleRoomJoin}>
          <button type="submit">Join Room</button>
          <input type="text" name="room" id="room" onChange={handleChange} />
        </form>
        <span>{/* Spacer */}</span>
        <button onClick={handleLogOut}>Log Out</button>
      </section>
    </main>
  );
}

export default HomePage;
