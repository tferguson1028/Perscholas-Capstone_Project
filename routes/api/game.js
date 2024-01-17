const express = require('express');
const router = express.Router();
const gameController = require('../../controllers/api/game');

// Base Route: /api/game

// 
router.get("/check_turn", gameController.functionName);
router.post("/action/:gameID/:userID", gameController.functionName);
