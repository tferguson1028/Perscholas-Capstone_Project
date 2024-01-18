import React from 'react';
import RoomStatus from '../../components/Room/RoomStatus/RoomStatus';
import RoomControls from '../../components/Room/RoomControls/RoomControls';

function RoomPage(props)
{
  const { user, room, setRoom } = props;
  
  return (
    <main>
      <header>
        <h1>Waiting Room {room}</h1>
      </header>
      <RoomStatus />
      <RoomControls user={user} room={room} setRoom={setRoom} />
    </main>
  );
}

export default RoomPage;
