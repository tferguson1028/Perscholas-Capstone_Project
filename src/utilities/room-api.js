import { sendRequest } from './send-request';
const BASE_URL = "/api/rooms";

export async function createRoom(userData) { return sendRequest(`${BASE_URL}/create`, "POST", userData); }
export async function joinRoom(roomID, userData) { return sendRequest(`${BASE_URL}/join/${roomID}`, "POST", userData); }
