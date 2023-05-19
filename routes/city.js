const express = require('express');
const router = express.Router();
const { cityController, countryController } = require('../controllers');

router.get('/', cityController.getAllCities);
router.post('/', countryController.createCity);
router.put('/', countryController.updateCity);
router.delete('/', countryController.deleteCity);
router.get('/byid', cityController.getCityById);

module.exports = router;
