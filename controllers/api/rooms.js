const response = require("./response");
const Room = require("../../models/room");
const cardsAPI = require("./cardsFetchAPI");

// Clear all rooms on server start
// Room.deleteMany({});

//* Exported Methods
module.exports = { create, join, leave };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }
function join(req, res) { return response.respond(req, res, joinRoomDispatch); }
function leave(req, res) { return response.respond(req, res, leaveRoomDispatch); }


//* Internal Methods
async function createNewRoomDispatch(req)
{
  console.log(`Created new room with ID: ${404}`);

  const gameDeck = await cardsAPI.newDeck();
  console.log(gameDeck);
  const room = await Room.create(newRoom(gameDeck));
  return room;
}

async function joinRoomDispatch(req)
{
  // TODO: Update the DB with the user information and respond with a room id

  const roomID = req.params[ "roomID" ];
  const room = await Room.findOne({ deckID: roomID });

  const usersArr = room.connectedUserIDs;
  usersArr.push(req.body._id);

  const updatedRoom = await Room.updateOne({ _id: room._id }, { connectedUserIDs: usersArr });
  console.log(room);
  console.log(updatedRoom);
  if(updatedRoom.acknowledged && updatedRoom.modifiedCount >= 1)
    return room.deckID;

  return null;
}

async function leaveRoomDispatch(req)
{
  const roomID = req.params[ "roomID" ];
  const room = await Room.findOne({ deckID: roomID });

  const usersArr = room.connectedUserIDs;
  usersArr.splice(usersArr.indexOf(req.body._id), 1);

  const updatedRoom = await Room.updateOne({ _id: room._id }, { connectedUserIDs: usersArr });
  console.log(room);
  console.log(updatedRoom);
  if(updatedRoom.acknowledged && updatedRoom.modifiedCount >= 1)
    return true;

  return null;
}

function deleteRoom(roomID)
{

}

function newRoom(cardAPIData)
{
  return (
    {
      deckID: cardAPIData.deck_id,
      connectedUserIDs: [],
      turnQueue: []
    });
}
