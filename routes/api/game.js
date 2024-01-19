const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/api/game');

// Base Route: /api/game

// POST
router.post("/action/:roomID", gameController.doAction);

// GET Routes
router.get("/update/:roomID", gameController.getUpdate);
router.get("/update/:roomID/await", gameController.awaitUpdate);
router.get("/cards/:roomID/:playerID", gameController.getCards);

module.exports = router;
