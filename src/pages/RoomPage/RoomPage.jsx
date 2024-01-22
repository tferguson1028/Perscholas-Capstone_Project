import React, { useEffect, useState } from 'react';
import RoomStatus from '../../components/Room/RoomStatus/RoomStatus';
import RoomControls from '../../components/Room/RoomControls/RoomControls';

import * as roomService from "../../utilities/room-service";

import styles from "./RoomPage.module.css";

function RoomPage(props)
{
  const { user, room, setRoom } = props;
  const [ error, setError ] = useState();
  const [ userList, setUserList ] = useState([]);
  
  useEffect(() => { getUsers() }, []);
  
  async function getUsers()
  {
    const users = await roomService.getUsers(room);
    setUserList(users);
    
    setTimeout(getUsers, 10000);
  }
  
  return (
    <main className={styles.RoomPage}>
      <section>
        <h1>Waiting Room</h1>
        <code>{room}</code>
        {error ? <p className='ErrorMessage'>{error}</p> : <></>}
      </section>
      <RoomStatus user={user} users={userList} />
      <section>
        <RoomControls user={user} room={room} setRoom={setRoom} setError={setError} />
      </section>
    </main>
  );
}

export default RoomPage;
