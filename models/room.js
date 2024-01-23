const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    deckID: { type: String, required: true },
    connectedUserIDs: [ { type: String, required: true } ],
    turnQueue: [ { type: String, required: true } ],
    turnsDone: { type: Number, default: 0, required: true },
    started: { type: Boolean, default: false, required: true },
    pot: { type: Number, default: 0, required: true },
    lastBet: { type: Number, default: 0, required: true }
  }, {
  timestamps: true
});

module.exports = mongoose.model("Room", roomSchema);
