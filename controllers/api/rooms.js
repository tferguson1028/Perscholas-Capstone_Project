const response = require("./response");
const Room = require("../../models/room");

//* Exported Methods
module.exports = { create, join };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }
function join(req, res) { return response.respond(req, res, joinRoomDispatch); }


//* Internal Methods
function createNewRoomDispatch(req)
{
  return null;
}

function joinRoomDispatch(req)
{
  return null;
}

function deleteRoom(roomID)
{
  
}
