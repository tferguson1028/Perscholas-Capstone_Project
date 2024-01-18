const express = require("express");
const router = express.Router();
const roomsController = require("../../controllers/api/rooms");
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Base Route: /api/rooms

// POST Routes
router.post("/create", ensureLoggedIn, roomsController.create);
router.post("/join/:roomID", ensureLoggedIn, roomsController.join);
router.post("/leave/:roomID", ensureLoggedIn, roomsController.leave);
router.post("/start/:roomID", ensureLoggedIn, roomsController.start);

// GET Routes
router.get("/start/:roomID/await", roomsController.awaitStart);


module.exports = router;
