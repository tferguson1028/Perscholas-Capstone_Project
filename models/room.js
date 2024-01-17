const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
{
  roomID: { type: String, required: true },
  deckID: { type: String, required: false },
  connectedUserIDs:  [String]
}, {
  timestamps: true
});

module.exports = mongoose.model("Room", roomSchema);
