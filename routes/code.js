const express = require('express');
const { codeController } = require('../controllers');

const router = express.Router();

router.post('/getCode', codeController.getAllCodes);

module.exports = router;
