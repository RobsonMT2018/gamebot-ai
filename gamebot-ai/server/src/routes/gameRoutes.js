const express = require('express');
const { getGameConcept } = require('../controllers/gameController');

const router = express.Router();

router.get('/game/concept', getGameConcept);

module.exports = router;
