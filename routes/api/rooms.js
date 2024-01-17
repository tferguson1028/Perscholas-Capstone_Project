const express = require("express");
const router = express.Router();
const roomsController = require("../../controllers/api/rooms");

// Base Route: /api/rooms

router.get("/create", roomsController.create);
router.post("/join/:roomID", gameController.join);
