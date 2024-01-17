
const response = require("./response");

//* Exported Methods
module.exports = {};
function checkTurn(req, res) { response.respond(req, res, checkTurnDispatch); }

//* Internal Methods
function checkTurnDispatch(userID, gameID)
{
  return new Error("TODO");
}

