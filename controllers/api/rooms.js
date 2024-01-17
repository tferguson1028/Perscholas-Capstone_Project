const response = require("./response");
const Room = require("../../models/room");
const cardsAPI = require("./cardsFetchAPI");

// Clear all rooms on server start
// Room.deleteMany({});

//* Exported Methods
module.exports = { create, join };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }
function join(req, res) { return response.respond(req, res, joinRoomDispatch); }


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
  
  const room = await Room.findOne({deckID: req.params["roomID"]});
  console.log(req.params.roomID);
  console.log(room);
  if(room)
    return room.deckID;
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
