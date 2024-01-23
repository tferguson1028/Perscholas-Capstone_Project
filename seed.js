// require('dotenv').config();
// require('./config/database');

// const Category = require('./models/category');
// const Item = require('./models/item');

// Suit are all even, ties are even splits
function developLookupTable()
{

}

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
let A = 14, K = 13, Q = 12, J = 11, suit = { "S": 1, "C": 2, "H": 4, "D": 8 };

//Calculates the Rank of a 5 card Poker hand using bit manipulations.
console.log(rankPokerHand([9, K, Q, J, 10], [ suit.D, suit.D, suit.D, suit.D, suit.D ])); // Example use case
console.log(rankPokerHand([9, K, Q, J, 10], [ suit.A, suit.C, suit.H, suit.D, suit.C ])); // Example use case
console.log(rankPokerHand([3, K, A, 9, J], [ suit.D, suit.H, suit.C, suit.D, suit.D ])); // Example use case
console.log(rankPokerHand([2, 4, 3, 6, 5], [ suit.D, suit.D, suit.D, suit.D, suit.D ])); // Example use case
console.log(rankPokerHand([A, A, A, A, 2], [ suit.D, suit.H, suit.C, suit.S, suit.D ])); // Example use case
console.log(rankPokerHand([5, 5, 4, 3, 3], [ suit.D, suit.C, suit.D, suit.C, suit.D ])); // Example use case
function rankPokerHand(cs, ss) 
{
  let v, i, o, s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
  for(i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) { v += o * ((v / o & 15) + 1); }

  v = v % 15 - ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
  v -= (ss[0] == (ss[1] | ss[2] | ss[3] | ss[4])) * ((s == 0x7c00) ? -5 : 1);

  let hand = hands[v] + (s == 0x403c ? " (Ace low)" : "");  
  switch(hand)
  {
    case "Royal Flush": return { hand, value: A+9 };
    case "Straight Flush": return { hand, value: A+8 };
    case "4 of a Kind": return { hand, value: A+7 };
    case "Full House": return { hand, value: A+6 };
    case "Flush": return { hand, value: A+5 };
    case "Straight": return { hand, value: A+4 };
    case "3 of a Kind": return { hand, value: A+3 };
    case "2 Pair": return { hand, value: A+2 };
    case "1 Pair": return { hand, value: A+1 };
    case "High Card":
      let max = cs.sort((a,b) => b-a)[0];
      return { hand, value: max };
  }
  return { hand, value: -1 };
}


// (async function()
// {
//   await Hand.deleteMany({});
//   const hands = await Hand.create([
//     { hand: "#.,..,..,..,..", name: "# High", value: "#" },
//     { hand: "J.,..,..,..,..", name: "Jack High", value: 11 },
//     { hand: "Q.,..,..,..,..", name: "Queen High", value: 12 },
//     { hand: "K.,..,..,..,..", name: "King High", value: 13 },
//     { hand: "A.,..,..,..,..", name: "Ace High", value: 14 },
//     { hand: "#.,#.,..,..,..", name: "Pair", value: 150 },
//   ]);
//
//   process.exit();
// })();
