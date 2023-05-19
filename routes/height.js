const express = require('express');
const router = express.Router();

const { heightController } = require('../controllers');

// Routes for heights in feet and inches
router.get('/heights/feet', heightController.getHeightsInFeet);
router.post('/heights/feet', heightController.createOrUpdateHeightsInFeet);

// Routes for heights in centimeters
router.get('/heights/centimeters', heightController.getHeightsInCentimeters);
router.post('/heights/centimeters', heightController.createOrUpdateHeightsInCentimeters);

module.exports = router;
