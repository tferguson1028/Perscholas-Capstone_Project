import { sendRequest } from './send-request';
const BASE_URL = "/api/game";

export async function sendAction(actionData) { return sendRequest(`${ BASE_URL }/action`, "POST", actionData); }
