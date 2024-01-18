import { sendRequest } from './send-request';
const BASE_URL = "/api/rooms";

export async function createRoom(userData) { return sendRequest(`${BASE_URL}/create`, "POST", userData); }
export async function joinRoom(roomID, userData) { return sendRequest(`${BASE_URL}/join/${roomID}`, "POST", userData); }
export async function leaveRoom(roomID, userData) { return sendRequest(`${BASE_URL}/leave/${roomID}`, "POST", userData); } 
export async function startGame(roomID, userData) { return sendRequest(`${BASE_URL}/start/${roomID}`, "POST", userData); }