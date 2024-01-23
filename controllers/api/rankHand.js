//https://www.codeproject.com/Articles/569271/A-Poker-hand-analyzer-in-JavaScript-using-bit-math
let hands = [
  "4 of a Kind",
  "Straight Flush",
  "Straight",
  "Flush",
  "High Card",
  "1 Pair",
  "2 Pair",
  "Royal Flush",
  "3 of a Kind",
  "Full House"
];
let rank = {
  "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "0": 10,
  "A": 14, "K": 13, "Q": 12, "J": 11
};
let suit = { "S": 1, "C": 2, "H": 4, "D": 8 };

module.exports = getHandRank;

function getHandRank(hand, community)
{
  let combinations = getCombinations(hand, community);
  combinations = combinations.map((comb) => { return rankHand(comb); });
  
  let bestComb = { hand: [], value: -1 };
  for(let comb of combinations)
    if(comb.value > bestComb.value)
      bestComb = comb;

  console.log(bestComb);
  return bestComb;
}

function getCombinations(arr1, arr2)
{
  const combinations = [];
  for(let i = 0; i < arr2.length; i++)
  {
    let comb = [...arr2];
    comb.splice(i, 1, arr1[0]);
    combinations.push(comb);
  }

  for(let i = 0; i < arr2.length; i++)
  {
    let comb = [...arr2];
    comb.splice(i, 1, arr1[1]);
    combinations.push(comb);
  }

  for(let i = 0; i < arr2.length; i++)
  {
    for(let j = i; j < arr2.length; j++)
    {
      let comb = [...arr2];
      comb.splice(i, 1, arr1[0]);
      comb.splice(j, 1, arr1[1]);
      combinations.push(comb);
    }
  }

  return combinations;
}

// Using card code from API (10 is 0 in the api)
function splitRankSuit(card)
{
  return {
    rank: rank[String(card).charAt(0)],
    suit: suit[String(card).charAt(1)]
  };
}

function rankHand(hand)
{
  let splitHand = [];
  for(let card of hand)
  {
    splitHand.push(splitRankSuit(card));
  }
  let handRanks = [];
  let handSuits = [];
  for(let card of splitHand)
  {
    handRanks.push(card.rank);
    handSuits.push(card.suit);
  }
  return rankPokerHand(handRanks, handSuits);
}

// console.log(rankPokerHand([9, K, Q, J, 10], [ suit.D, suit.D, suit.D, suit.D, suit.D ])); // Example use case
//Calculates the Rank of a 5 card Poker hand using bit manipulations.
function rankPokerHand(cs, ss) 
{
  let v, i, o, s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
  for(i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) { v += o * ((v / o & 15) + 1); }

  v = v % 15 - ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
  v -= (ss[0] == (ss[1] | ss[2] | ss[3] | ss[4])) * ((s == 0x7c00) ? -5 : 1);

  let hand = hands[v] + (s == 0x403c ? " (Ace low)" : "");
  switch(hand)
  {
    case "Royal Flush": return { hand, value: rank.A + 9 };
    case "Straight Flush": return { hand, value: rank.A + 8 };
    case "4 of a Kind": return { hand, value: rank.A + 7 };
    case "Full House": return { hand, value: rank.A + 6 };
    case "Flush": return { hand, value: rank.A + 5 };
    case "Straight": return { hand, value: rank.A + 4 };
    case "3 of a Kind": return { hand, value: rank.A + 3 };
    case "2 Pair": return { hand, value: rank.A + 2 };
    case "1 Pair": return { hand, value: rank.A + 1 };
    case "High Card":
      let max = cs.sort((a, b) => b - a)[0];
      return { hand, value: max };
  }
  return { hand, value: -1 };
}
