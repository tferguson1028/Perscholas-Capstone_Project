import * as gameAPI from "./game-api";

export async function sendAction(roomID, userData, actionPayload)
{
  const payload = { user: userData, action: actionPayload };
  const response = await gameAPI.sendAction(roomID, payload);
  return response;
}

export async function updateGame(roomID)
{
  const response = await gameAPI.getUpdate(roomID);
  return response;
  
}

export async function awaitUpdate(roomID)
{
  const response = await gameAPI.awaitUpdate(roomID);
  return response;
}
