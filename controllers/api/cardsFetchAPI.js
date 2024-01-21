//* API Methods
const cardsAPI = {
  //Deck Calls (Drawn cards are left in the ether unless placed in a pile. These are considered discarded.)
  newDeck: (addJokers = false) => { return getAPIData(`https://deckofcardsapi.com/api/deck/new/shuffle/?jokers_enabled=${addJokers}`); },
  viewDeck: (deckID) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}`); },
  reshuffleDeck: (deckID) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle?remaining=true`); },
  returnDiscarded: (deckID) => { getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/return`); },
  drawFromDeck: (deckID, count = 1) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${count}`); },
  drawToPlayer: (deckID, playerID, count = 1) =>
  {
    const drawnCards = drawFromDeck(deckID, count);
    const cards = drawnCards.cards;
    for(let card of cards)
      addToPile(deckID, playerID, card.code);
      
    return viewPlayerHand(deckID, playerID);
  },

  // PLayer Pile Calls (Players are considered piles)
  addToPlayerHand: (deckID, playerID, cardAbbr) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${playerID}/add/?cards=${cardAbbr}`); },
  viewPlayerHand: (deckID, playerID) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${playerID}/list`); },
  drawFromPlayerHand: (deckID, count = 1) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${pile}/draw/?count=${count}`); },
  returnPlayerHandToDeck: (deckID, playerID) => { return getAPIData(`https://deckofcardsapi.com/api/deck/${deckID}/pile/${playerID}/return`); }
};

module.exports = cardsAPI;

//* Internal Functions
async function getAPIData(request)
{
  try
  {
    console.log("Fetching data");
    const result = await fetch(request);
    const data = await result.json();
    console.log("Retrieved Data: ", data);
    // console.log(data);
    return data;
  } catch(exception)
  {
    console.error("Error occurred while fetching.\n" + exception);
    return {};
  }
}
