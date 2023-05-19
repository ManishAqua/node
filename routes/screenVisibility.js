const express = require('express');
const router = express.Router();
const { screenVisibilityController } = require('../controllers');

router.get('/', screenVisibilityController.getAll);
router.get('/:id', screenVisibilityController.getById);
router.post('/', screenVisibilityController.create);
router.put('/:id', screenVisibilityController.updateById);
router.delete('/:id', screenVisibilityController.deleteById);

module.exports = router;
