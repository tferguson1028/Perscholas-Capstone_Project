const response = require("./response");
const Room = require("../../models/room");

//* Exported Methods
module.exports = { doAction, getUpdate };
function doAction(req, res) { response.respond(req, res, playerActionDispatch); }
function getUpdate(req, res) { response.respond(req, res, getUpdateDispatch); }

//* Dispatch Methods
function getUpdateDispatch(req)
{

}

function playerActionDispatch(req)
{

}

//* Internal Methods
function startGame(roomID)
{

}

function checkPlayerTurn(userID, roomID)
{

}

function updateGameState(roomID)
{

}
