const response = require("./response");

//* Exported Methods
module.exports = { create };
function create(req, res) { return response.respond(req, res, createNewRoomDispatch); }

//* Internal Methods
function createNewRoomDispatch(req)
{
  return null;
}
