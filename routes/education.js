const express = require('express');
const router = express.Router();

const { educationController } = require('../controllers');

// GET all education
router.get('/education', educationController.getEducation);

// GET a single education by ID
router.get('/education/:id', educationController.getEducationById);

// POST a new education
router.post('/education', educationController.createEducation);

// PUT (update) an existing education by ID
router.put('/education/:id', educationController.updateEducationById);

// DELETE an existing education by ID
router.delete('/education/:id', educationController.deleteEducationById);

module.exports = router;
