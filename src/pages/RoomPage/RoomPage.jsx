import React, { useState } from 'react';
import RoomStatus from '../../components/Room/RoomStatus/RoomStatus';
import RoomControls from '../../components/Room/RoomControls/RoomControls';

function RoomPage(props)
{
  const { user, room, setRoom } = props;
  const [ error, setError ] = useState();

  return (
    <main>
      <header>
        <h1>Waiting Room {room}</h1>
        {error ? <p>{error}</p> : <></>}
      </header>
      <RoomStatus />
      <RoomControls user={user} room={room} setRoom={setRoom} setError={setError} />
    </main>
  );
}

export default RoomPage;
