const express = require('express');
const router = express.Router();

const { substanceController } = require('../controllers');

// GET all substance statuses
router.get('/substance', substanceController.getSubstances);

// GET a single substance status by ID
router.get('/substance/:id', substanceController.getSubstanceById);

// POST a new substance status
router.post('/substance', substanceController.createSubstance);

// PUT (update) an existing substance status by ID
router.put('/substance/:id', substanceController.updateSubstanceById);

// DELETE an existing substance status by ID
router.delete('/substance/:id', substanceController.deleteSubstanceById);

module.exports = router;
