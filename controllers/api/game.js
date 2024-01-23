/*
  Since the data for the game is being held on the Deck of Cards API,
  the server does not need to keep track of individual games.
*/

const response = require("./response");
const Room = require("../../models/room");
const User = require("../../models/user");

const cardsAPI = require("./cardsFetchAPI");
const rankHand = require("./rankHand");

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
    dealCards(roomID, room.turnQueue, 2);
  }

  processResponsePoll(roomID);
  return room.started;
}

async function playerActionDispatch(req)
{
  const roomID = req.params["roomID"];
  const room = await Room.findOne({ deckID: roomID });
  const playerTurn = await checkPlayerTurn(roomID, req.body["user"]._id);
  if(!playerTurn) return false;

  let response = await updateGameState(roomID, req.body["user"]._id, req.body["action"]);
  if(!response) return false;

  updateQueue(roomID);
  let turnQueue = room.turnQueue;
  let turnsDone = room.turnsDone + 1;
  await Room.updateOne({ _id: room._id }, { turnsDone: turnsDone });

  if(turnsDone >= turnQueue.length)
  {
    await nextRound(roomID);
    await Room.updateOne({ _id: room._id }, { turnsDone: 0 }); // Reset turn counter each round.
  }

  processResponsePoll(roomID);
  return response;
}

async function getUpdateDispatch(req)
{
  const roomID = req.params["roomID"];
  const room = await Room.findOne({ deckID: roomID });
  const cardData = await cardsAPI.viewPlayerHand(roomID, "All");
  const currentTurn = await User.findById(room.turnQueue[0]);

  return {
    pot: room.pot,
    lastBet: room.lastBet,
    turnsDone: room.turnsDone,
    currentTurn: currentTurn.name,
    cardData
  };
}

async function getCardsDispatch(req)
{
  const roomID = req.params["roomID"];
  const userID = req.params["userID"]; // Don't peak

  console.log("Cards from ", roomID + "/" + userID);

  const gameData = await cardsAPI.viewPlayerHand(roomID, userID);
  const pile = gameData["piles"][userID];

  // console.log(pile);

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
  if(
    communityPile.length >= 5 ||
    room.turnQueue.length <= 1 ||
    (room.turnsDone >= room.turnQueue.length && room.lastBet <= 0))
  {
    // Hand is over if no one raised the bet.
    await nextHand(roomID);
  } else if(communityPile.length === 0)
  {
    await dealCards(roomID, ["community"], 3); // community is in array due to how the function works
  } else
  {
    await dealCards(roomID, ["community"], 1);
  }

  await Room.updateOne({ _id: room._id }, { lastBet: 0 });
}

async function nextHand(roomID)
{
  const room = await Room.findOne({ deckID: roomID });
  const piles = room.turnQueue;

  const cardData = await cardsAPI.viewPlayerHand(roomID, "community");
  const communityPile = cardData.piles["community"].cards;

  let bestHand = Number.MIN_SAFE_INTEGER;
  let currentWinner = "house";

  if(communityPile.length < 5) await dealCards(roomID, ["community"], 5 - communityPile.length);

  console.log("\n***** GETTING HAND EVALUATIONS: ");
  for(let pile of piles)
  {
    const handRank = await getHandRank(roomID, pile);
    console.log(pile, "rank", handRank);

    if(bestHand < handRank.value)
    {
      bestHand = handRank.value;
      currentWinner = pile;
    }
  }

  await processResponsePoll(roomID);

  const turnQueue = shuffleArray(room.connectedUserIDs);
  console.log(turnQueue);

  await emptyPotTo(roomID, currentWinner);
  await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue, turnsDone: 0 });
  
  // Gotta slow down the processes :(
  setTimeout(async () => {
    await clearPiles(roomID);
  }, 3000);

  setTimeout(async () =>
  {
    await dealCards(roomID, turnQueue, 2);
    await processResponsePoll(roomID);
  }, 5000);
}

async function updateGameState(roomID, userID, actionPayload)
{
  const room = await Room.findOne({ deckID: roomID });
  const lastBet = room.lastBet;

  console.log(actionPayload);
  switch(actionPayload.action)
  {
    case "check": break;
    case "call": addToPot(roomID, userID, lastBet); break;
    case "raise": addToPot(roomID, userID, actionPayload.amount, true); break;
    case "fold":
      let turnQueue = room.turnQueue;
      turnQueue.splice(turnQueue.indexOf(userID), 1);
      await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });
      break;
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
  await Room.updateOne({ _id: room._id }, { turnQueue: turnQueue });
}

async function dealCards(roomID, turnQueue = [], amount = 1)
{
  let cards = await cardsAPI.drawFromDeck(roomID, amount * turnQueue.length);

  console.log("\n***** Dealing Cards: ");

  let select = 0;
  for(let card of cards.cards)
  {
    let cardCode = card.code;
    await cardsAPI.addToPlayerHand(roomID, turnQueue[select], cardCode);
    console.log("dealt:", cardCode, "to", turnQueue[select]);
    select = (select + 1) % turnQueue.length;
  }
}

async function getHandRank(roomID, userID)
{
  let playerHand = await cardsAPI.viewPlayerHand(roomID, userID);
  playerHand = playerHand.piles[userID].cards;
  playerHand = playerHand.map((card) => { return card.code; });
  console.log("Player hand (codes): ", playerHand);

  let communityHand = await cardsAPI.viewPlayerHand(roomID, "community");
  communityHand = communityHand.piles["community"].cards;
  communityHand = communityHand.map((card) => { return card.code; });
  console.log("Community hand (codes): ", communityHand);

  return rankHand(playerHand, communityHand);
}

async function clearPiles(roomID)
{
  // Deck of Cards API returns all active piles no matter which pile is listed
  const cardData = await cardsAPI.viewPlayerHand(roomID, "ALL");
  const piles = cardData.piles || {};

  console.log("\n****** CLEARING CARDS");

  // for-in returns a key, which is the name of the pile in the api
  // awaiting to allow function to complete before doing multiple api calls.
  for(let pile in piles)
    await cardsAPI.returnPlayerHandToDeck(roomID, pile);

  await cardsAPI.returnDiscarded(roomID);
  await cardsAPI.reshuffleDeck(roomID);
}

async function addToPot(roomID, userID, amount = 0, raise = false)
{
  const room = await Room.findOne({ deckID: roomID });
  const user = await User.findOne({ _id: userID });
  let potValue = amount + room.pot;
  let userValue = user.money - amount;

  let bet = amount;
  if(raise)
    bet = room.lastBet + amount;

  console.log(`Adding ${amount} to pot`);

  await Room.updateOne({ _id: room._id }, { pot: potValue, lastBet: bet });
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
    for(let res of(responsePoll[roomID] || []))
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
