const express = require('express');
const router = express.Router();

const { languageController } = require('../controllers');

// GET all language statuses
router.get('/language', languageController.getLanguages);

// GET a single language status by ID
router.get('/language/:id', languageController.getLanguageById);

// POST a new language status
router.post('/language', languageController.createLanguage);

// PUT (update) an existing language status by ID
router.put('/language/:id', languageController.updateLanguageById);

// DELETE an existing language status by ID
router.delete('/language/:id', languageController.deleteLanguageById);

module.exports = router;
