const response = require("./response");

//* External Methods
module.exports = { create };
function create(req, res) { return response(req, res, createNewRoomDispatch); }

//* Internal Methods
function createNewRoomDispatch(req, res)
{
    
}

