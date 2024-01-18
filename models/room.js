const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    deckID: { type: String, required: true },
    connectedUserIDs: [ { type: String, required: true } ],
    turnQueue: [ { type: String, required: true } ],
    started: { type: Boolean, default: false }
  }, {
  timestamps: true
});

module.exports = mongoose.model("Room", roomSchema);
