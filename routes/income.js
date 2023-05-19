const express = require('express');
const router = express.Router();

const { incomeController } = require('../controllers');

// GET all income
router.get('/income', incomeController.getIncome);

// POST a new income
router.post('/income', incomeController.createIncome);

// PUT (update) an existing income
router.put('/income', incomeController.updateIncome);

// DELETE an existing income
router.delete('/income', incomeController.deleteIncome);

module.exports = router;
