const express = require('express');
const router = express.Router();
const { verificationTextController } = require('../controllers');

router.get('/', verificationTextController.getAll);
router.get('/:id', verificationTextController.getById);
router.post('/', verificationTextController.create);
router.put('/:id', verificationTextController.updateById);
router.delete('/:id', verificationTextController.deleteById);

module.exports = router;
