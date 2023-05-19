const express = require('express');
const router = express.Router();
const { backgroundHeadingController } = require('../controllers');

router.get('/', backgroundHeadingController.getAll);
router.get('/:id', backgroundHeadingController.getById);
router.post('/', backgroundHeadingController.create);
router.put('/:id', backgroundHeadingController.updateById);
router.delete('/:id', backgroundHeadingController.deleteById);

module.exports = router;
