const express = require('express');
const router = express.Router();

const { genderController } = require('../controllers');

// GET all genders
router.get('/genders', genderController.getGenders);

// GET a single gender by ID
router.get('/genders/:id', genderController.getGenderById);

// POST a new gender
router.post('/genders', genderController.createGender);

// PUT (update) an existing gender by ID
router.put('/genders/:id', genderController.updateGenderById);

// DELETE an existing gender by ID
router.delete('/genders/:id', genderController.deleteGenderById);

module.exports = router;
