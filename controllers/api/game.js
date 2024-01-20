/*
  Since the data for the game is being held on the Deck of Cards API,
  the server does not need to keep track of individual games.
*/

const response = require("./response");
const Room = require("../../models/room");
const User = require("../../models/user");

const cardsAPI = require("./cardsFetchAPI");

//# Exported Methods
module.exports = { start, doAction, getUpdate, awaitUpdate, getCards };

function start(req, res) { return response.respond(req, res, startDispatch); }
function doAction(req, res) { return response.respond(req, res, playerActionDispatch); }
function getUpdate(req, res) { return response.respond(req, res, getUpdateDispatch); }
function awaitUpdate(req, res) { return awaitUpdateDispatch(req, res); }
function getCards(req, res) { return response.respond(req, res, getCardsDispatch); }

//# Dispatch Methods
async function startDispatch(req)
{
  const roomID = req.params["roomID"];
  const room = await Room.findOne({ deckID: roomID });

  if(!room.started)
  {
    await Room.updateOne({ _id: room._id }, { started: true });
    nextRound(roomID);
  }

  return room.started;
}

async function playerActionDispatch(req)
{
  const roomID = req.params["roomID"];
  const playerTurn = await checkPlayerTurn(roomID, req.body["user"]._id);
  if(!playerTurn) return false;

  let response = await updateGameState(roomID, req.body["action"]);
  if(!response) return false;

  console.log("Response_dispatch: ", response);
  updateQueue(roomID);

  const room = await Room.findOne({ deckID: roomID });
  let users = room.connectedUserIDs;
  let turnsDone = turnsDone;
  if(turnsDone >= users.length)
  {
    await nextRound(roomID);
    await Room.updateOne({ _id: room._id }, { turnsDone: 0 });
  }

  processResponsePoll(roomID);
  return response;
}

function getUpdateDispatch(req)
{
  return null;
}

async function getCardsDispatch(req)
{
  const roomID = req.params["roomID"];
  const userID = req.params["userID"]; // Don't peak

  const gameData = await cardsAPI.viewPlayerHand(roomID, userID);
  const pile = gameData["piles"][userID];

  if(pile)
    return pile.cards;
  return [];
}

//# Internal Methods
async function nextRound(roomID)
{
  const room = await Room.findOne({ deckID: roomID });
  const gameData = await cardsAPI.viewPlayerHand(roomID, "community");
  const communityPile = gameData.piles["community"].cards || [];
  if(room.lastBet > 0 || communityPile.length >= 5)
  {
    // Hand is over, reset
    await nextHand(roomID);
  }else{
    const turnQueue = shuffleArray(room.connectedUserIDs);
    await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });
  }
}

async function nextHand(roomID)
{
  const cardData = await cardsAPI.viewPlayerHand(roomID, "ALL");
  const piles = cardData.piles || {};
  let bestHand = Number.MIN_SAFE_INTEGER;
  let currentWinner = "house :P";
  for(let pile in piles)
  {
    const player = await cardsAPI.viewPlayerHand(roomID, pile);
    const hand = player.cards;
    const handRank = evaluateHand(hand);
    
    if(bestHand < handRank)
    {
      bestHand = handRank;
      currentWinner = pile;
    }
    const turnQueue = shuffleArray(usersArr);
    await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });

    await emptyPotTo(roomID, currentWinner);
  }
  
  await clearPiles(roomID);
}

async function evaluateHand(hand = [])
{
  const handRank = func();
  
}

async function updateGameState(roomID, userID, actionPayload)
{
  const room = await Room.findOne({ deckID: roomID });
  const lastBet = room.lastBet;
  switch(actionPayload.action)
  {
    case "check": break;
    case "call": addToPot(roomID, userID, lastBet); break;
    case "raise": addToPot(roomID, userID, actionPayload.value); break;
    case "fold": break;
    default: return false;
  }
  return true;
}

async function checkPlayerTurn(roomID, userID)
{
  const room = await Room.findOne({ deckID: roomID });
  const turnQueue = room.turnQueue;
  return turnQueue[0] == userID;
}

async function updateQueue(roomID)
{
  const room = await Room.findOne({ deckID: roomID });
  const turnQueue = room.turnQueue;

  turnQueue.push(turnQueue.shift());
  const updatedRoom = await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });
}

async function dealCards(roomID, turnQueue = [], amount = 1)
{
  let cards = await cardsAPI.drawFromDeck(roomID, amount*turnQueue.length);

  for(let player of turnQueue)
  {
    let card = cards.pop().code;
    await cardsAPI.addToPlayerHand(roomID, player, card);
  }
}

async function getHandRank(roomID, userID)
{
  const gameData = await cardsAPI.viewPlayerHand(roomID, userID);
  let cards = gameData.piles[userID].cards || [];
}

async function clearPiles(roomID)
{
  // Deck of Cards API returns all active piles no matter which pile is listed
  const cardData = await cardsAPI.viewPlayerHand(roomID, "ALL");
  const piles = cardData.piles || {};

  // for-in returns a key, which is the name of the pile in the api
  // awaiting to allow function to complete before doing multiple api calls.
  for(let pile in piles)
    await cardsAPI.returnPlayerHandToDeck(roomID, pile);

  await cardsAPI.returnDiscarded(roomID);
}

async function addToPot(roomID, userID, amount = 0)
{
  const room = await Room.findOne({ deckID: roomID });
  const user = await User.findOne({ _id: userID });
  let potValue = amount + room.pot;
  let userValue = user.money - amount;

  await Room.updateOne({ _id: room._id }, { pot: potValue });
  await User.updateOne({ _id: userID }, { money: userValue });
}

async function emptyPotTo(roomID, userID)
{
  const room = await Room.findOne({ deckID: roomID });
  const user = await User.findOne({ _id: userID });

  const value = user.money + room.pot;
  await Room.updateOne({ _id: room._id }, { pot: 0 });
  await User.updateOne({ _id: userID }, { money: value });
}


//# Long polling functionality
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
  {
    for(let res of (responsePool[roomID] || []))
    {
      console.log(true);
      res.status(200).json(true);
    }
  }

  responsePoll[roomID] = undefined;
}


//# Aux Methods
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
