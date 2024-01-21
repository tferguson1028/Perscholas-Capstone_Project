import * as gameAPI from "./game-api";

export async function sendAction(roomID, userData, actionPayload)
{
  const payload = { user: userData, action: actionPayload };
  const response = await gameAPI.sendAction(roomID, payload);
  return response;
}

export async function startGame(roomID)
{
  const response = await gameAPI.startGame(roomID);
  return response;
}

export async function updateGame(roomID)
{
  const response = await gameAPI.getUpdate(roomID);
  return response;
}

export async function getCards(roomID, userData)
{
  const response = await gameAPI.getCards(roomID, userData);
  return response;
}

export async function awaitUpdate(roomID)
{
  const response = await gameAPI.awaitUpdate(roomID);
  return response;
}
