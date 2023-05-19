const express = require('express');
const router = express.Router();
const { stateController, countryController } = require('../controllers');

router.get('/', stateController.getAllStates);
router.post('/', countryController.createState);
router.put('/', countryController.updateState);
router.delete('/', countryController.deleteState);
router.post('/byid', stateController.getStateById);

module.exports = router;
