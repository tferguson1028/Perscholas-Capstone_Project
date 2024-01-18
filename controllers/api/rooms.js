const response = require("./response");
const Room = require("../../models/room");
const cardsAPI = require("./cardsFetchAPI");

// Clear all rooms on server start
// Room.deleteMany({});

//* Exported Methods
module.exports = { create, join, leave, start, awaitStart };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }
function join(req, res) { return response.respond(req, res, joinRoomDispatch); }
function leave(req, res) { return response.respond(req, res, leaveRoomDispatch); }
function start(req, res) { return response.respond(req, res, startGameDispatch); }

function awaitStart(req, res) { return awaitStartGameDispatch(req, res); }

//* Dispatch Methods
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

  const roomID = req.params["roomID"];
  const room = await Room.findOne({ deckID: roomID });

  const usersArr = room.connectedUserIDs;
  if(usersArr.indexOf(req.body._id) === -1)
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
  const roomID = req.params["roomID"];
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

async function startGameDispatch(req)
{
  const roomID = req.params["roomID"];
  const room = await Room.findOne({ deckID: roomID });
  const usersArr = room.connectedUserIDs;

  if(usersArr.indexOf(req.body._id) === -1)
    return null;

  const turnQueue = shuffleArray(usersArr);
  const updatedRoom = await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue, started: true });


  if(updatedRoom.modifiedCount >= 1 && turnQueue.length > 1)
  {
    processResponsePoll(roomID);
    return false;
  }
  return null;
}

//* Long polling functionality
// Refs: 
//   https://ably.com/topic/websocket-alternatives#long-polling
//   https://stackoverflow.com/a/45854088
const responsePoll = {
  exampleStack: ["res", "res", "res"],
};

async function awaitStartGameDispatch(req, res)
{
  const roomID = req.params["roomID"];
  
  console.log(`Connection added to poll for room ${roomID}. Response will be sent to client upon game start.`);
  
  if(typeof responsePoll[roomID] === "undefined")
    responsePoll[roomID] = [];
  
  responsePoll[roomID].push(res);
}

async function processResponsePoll(roomID)
{
  const room = await Room.findOne({ deckID: roomID });

  // If the game is started, go through each item in the responsePoll with the same roomID and send a start response.
  if(room.started)
    for(let res of responsePoll[roomID])
    {
      console.log(true);
      res.status(200).json(true);
    }
    
  responsePoll[roomID] = undefined;
}

//* Internal Methods
function shuffleArray(arr = [])
{
  let arrClone = [...arr]; //Clone array
  let newArr = [];

  while(arrClone.length > 0)
  {
    let index = Math.floor(Math.random() * arrClone.length);
    newArr.push(arrClone.splice(index, 1));
  }

  return newArr.flat();
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

async function deleteRoom(roomID)
{
  const status = await Room.deleteOne({ deckID: roomID });
  return status.acknowledged;
}
