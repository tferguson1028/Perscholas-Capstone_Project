import { sendRequest } from './send-request';
const BASE_URL = "/api/game";

export async function sendAction(roomID, payload) { return sendRequest(`${ BASE_URL }/action/${roomID}`, "POST", payload); }
export async function startGame(roomID) { return sendRequest(`${BASE_URL}/start/${roomID}`); }
export async function getUpdate(roomID) { return sendRequest(`${BASE_URL}/update/${roomID}`); }

// Awaiting Functions
export async function awaitUpdate(roomID) { return sendRequest(`${BASE_URL}/update/${roomID}/await`); }
