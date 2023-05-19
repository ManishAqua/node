const express = require('express');
const router = express.Router();

const { martialController } = require('../controllers');

// GET all martial statuses
router.get('/martial', martialController.getMartials);

// GET a single martial status by ID
router.get('/martial/:id', martialController.getMartialById);

// POST a new martial status
router.post('/martial', martialController.createMartial);

// PUT (update) an existing martial status by ID
router.put('/martial/:id', martialController.updateMartialById);

// DELETE an existing martial status by ID
router.delete('/martial/:id', martialController.deleteMartialById);

module.exports = router;
