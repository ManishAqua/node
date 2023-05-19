const express = require('express');
const router = express.Router();

const { occupationController } = require('../controllers');

// GET all occupation
router.get('/occupation', occupationController.getOccupation);

// GET a single occupation by ID
router.get('/occupation/:id', occupationController.getOccupationById);

// POST a new occupation
router.post('/occupation', occupationController.createOccupation);

// PUT (update) an existing occupation by ID
router.put('/occupation/:id', occupationController.updateOccupationById);

// DELETE an existing occupation by ID
router.delete('/occupation/:id', occupationController.deleteOccupationById);

module.exports = router;
