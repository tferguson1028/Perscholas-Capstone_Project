const response = require("./response");
const Room = require("../../models/room");

// TODO: Check all rooms on the database and if they are expired delete them.


//* Exported Methods
module.exports = { create, join };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }
function join(req, res) { return response.respond(req, res, joinRoomDispatch); }


//* Internal Methods
function createNewRoomDispatch(req)
{
  console.log(`Created new room with ID: ${404}`);
  
  // TODO: Create a room on the database using the schema. Add a timeout function that will delete the room after 20 minutes.
  
  return "Room created";
}

function joinRoomDispatch(req)
{
  // TODO: Update the DB with the user information and respond with a room id

  return "TestJoin";
}

function deleteRoom(roomID)
{
  
}
