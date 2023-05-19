const express = require('express');
const router = express.Router();
const { countryController } = require('../controllers');

router.get('/', countryController.getAllCountries);
router.get('/:id', countryController.getCountryById);
router.post('/', countryController.createCountry);
router.put('/:id', countryController.updateCountry);
router.delete('/:id', countryController.deleteCountry);

router.post('/:id/states', countryController.createState);
router.put('/:countryId/states/:stateId', countryController.updateState);
router.delete('/:countryId/states/:stateId', countryController.deleteState);

router.post('/:countryId/states/:stateId/cities', countryController.createCity);
router.put('/:countryId/states/:stateId/cities/:cityId', countryController.updateCity);
router.delete('/:countryId/states/:stateId/cities/:cityId', countryController.deleteCity);

module.exports = router;
