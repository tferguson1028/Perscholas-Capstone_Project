const express = require("express");
const router = express.Router();
const roomsController = require("../../controllers/api/rooms");
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Base Route: /api/rooms

router.post("/create", ensureLoggedIn, roomsController.create);
router.post("/join/:roomID", ensureLoggedIn, roomsController.join);

module.exports = router;
