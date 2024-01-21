import React, { useState } from 'react';

import * as userService from "../../utilities/users-service";
import * as roomService from "../../utilities/room-service";

import Logo from '../../components/Logo/Logo';

import styles from "./HomePage.module.css";

function HomePage(props)
{
  const { user = {}, setUser = () => {}, setRoom = () => {} } = props;
  const [joinID, setJoinID] = useState();
  const [error, setError] = useState("");

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
    console.log("Created room with id: ", roomID);
    setRoom(roomID);

    handleRoomJoin(undefined, roomID);
  }

  async function handleRoomJoin(event, roomID)
  {
    if(event) event.preventDefault();

    roomID = roomID ? roomID : await roomService.joinRoom(joinID, user);
    if(!roomID) setError("Failed to join");
    console.log("Joining room with id: ", roomID);
    setRoom(roomID);
  }

  return (
    <main className={styles.HomePage}>
      <Logo />
      <section className={styles.RoomList}>
        {error ? <h4>{error}</h4> : <></>}
      </section>
      <section className={styles.UserDisplay}>
        <p>{user.name}</p>
        <p>
          <span>Tokens</span>
          <span>
            <span>&#x1FA99;</span>
            {user.money}
          </span>
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
