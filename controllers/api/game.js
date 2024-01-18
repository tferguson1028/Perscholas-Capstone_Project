/*
  Since the data for the game is being held on the Deck of Cards API,
  the server does not need to keep track of individual games.
*/

const response = require("./response");
const Room = require("../../models/room");

//* Exported Methods
module.exports = { doAction, getUpdate, awaitUpdate };
function doAction(req, res) { return response.respond(req, res, playerActionDispatch); }
function getUpdate(req, res) { return response.respond(req, res, getUpdateDispatch); }
function awaitUpdate(req, res) { return awaitUpdateDispatch(req, res); }


//* Dispatch Methods
function playerActionDispatch(req)
{
  const roomID = req.paras["roomID"];

  if(!checkPlayerTurn(roomID, req.body["user"]._id)) return false;

  updateGameState(roomID, req.body["action"]);
  updateQueue(roomID);
  
  processResponsePoll();

  return true;
}

function getUpdateDispatch(req)
{
  return null;
}

//* Internal Methods
async function checkPlayerTurn(roomID, userID)
{
  const room = await Room.findOne({ deckID: roomID });
  const turnQueue = room.turnQueue;
  return turnQueue[0] === userID;
}

async function updateQueue(roomID)
{
  const room = await Room.findOne({ deckID: roomID });
  const turnQueue = room.turnQueue;

  turnQueue.push(turnQueue.shift());
  const updatedRoom = await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });
}

function updateGameState(roomID, action)
{

}

//* Long polling functionality
// Refs: 
//   https://ably.com/topic/websocket-alternatives#long-polling
//   https://stackoverflow.com/a/45854088
const responsePoll = {};

async function awaitUpdateDispatch(req, res)
{
  const roomID = req.params["roomID"];

  console.log(`Connection added to poll for game ${roomID}. Response will be sent to client upon update.`);

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
