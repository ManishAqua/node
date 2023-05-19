const express = require('express');
const router = express.Router();

const { foodController } = require('../controllers');

// GET all food statuses
router.get('/food', foodController.getFoods);

// GET a single food status by ID
router.get('/food/:id', foodController.getFoodById);

// POST a new food status
router.post('/food', foodController.createFood);

// PUT (update) an existing food status by ID
router.put('/food/:id', foodController.updateFoodById);

// DELETE an existing food status by ID
router.delete('/food/:id', foodController.deleteFoodById);

module.exports = router;
