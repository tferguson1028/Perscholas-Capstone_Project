import * as roomAPI from "./room-api";

export async function createRoom(userData)
{
  const data = await roomAPI.createRoom(userData);
  return await joinRoom(data.roomID, userData);
}

export async function joinRoom(roomID, userData)
{
  const data = await roomAPI.joinRoom(roomID, userData);
  return data;
}

export async function leaveRoom(roomID, userData) 
{ 
  const status = await roomAPI.leaveRoom(roomID, userData);
  return status;
}

export async function startGame(roomID, userData)
{
  const status = await roomAPI.startGame(roomID, userData);
  return status;
}
