const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/api/game');

// Base Route: /api/game

router.get("/update/:roomID", gameController.getUpdate);
router.post("/action/:roomID/:userID", gameController.doAction);

module.exports = router;
