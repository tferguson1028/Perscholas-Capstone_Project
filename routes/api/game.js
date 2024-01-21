const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/api/game');

// Base Route: /api/game

// POST
router.post("/action/:roomID", gameController.doAction);

// GET Routes
router.get("/start/:roomID", gameController.start);
router.get("/update/:roomID", gameController.getUpdate);
router.get("/update/:roomID/await", gameController.awaitUpdate);
router.get("/cards/:roomID/:userID", gameController.getCards);

module.exports = router;
