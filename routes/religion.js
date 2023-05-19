const express = require('express');
const router = express.Router();

const { religionController } = require('../controllers');

// GET all religion statuses
router.get('/religion', religionController.getReligions);

// GET a single religion status by ID
router.get('/religion/:id', religionController.getReligionById);

// POST a new religion status
router.post('/religion', religionController.createReligion);

// PUT (update) an existing religion status by ID
router.put('/religion/:id', religionController.updateReligionById);

// DELETE an existing religion status by ID
router.delete('/religion/:id', religionController.deleteReligionById);

module.exports = router;
