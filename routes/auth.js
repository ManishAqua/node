const express = require('express');
const { body } = require('express-validator');
const { authController } = require('../controllers');
const router = express.Router();

router.post('/login', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[@$!%*#?&]/).withMessage('Password must contain a special character (@$!%*#?&)')
], authController.login);

module.exports = router;
