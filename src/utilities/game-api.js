import { sendRequest } from './send-request';
const BASE_URL = "/api/game";

export async function sendAction(actionData) { return sendRequest(`${ BASE_URL }/action`, "POST", actionData); }
export async function getUpdate(roomID) { return sendRequest(`${BASE_URL}/update/${roomID}`); }

// Awaiting Functions
export async function awaitUpdate(roomID) { return sendRequest(`${BASE_URL}/update/${roomID}/await`); }
