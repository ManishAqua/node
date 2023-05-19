const express = require('express');
const { body, validationResult } = require('express-validator');
const { userController } = require('../controllers');
const router = express.Router();

router.get('/', userController.getUsers);

router.post('/data', userController.getUserByPhoneNumber);

router.post('/', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password must contain only letters and numbers')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const user = await userController.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/saveUser', [
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .isAlphanumeric().withMessage('Password must contain only letters and numbers')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const user = await userController.saveUserData(req, res, next);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/getUserImages', userController.getUserImages);

router.patch('/:id', async (req, res, next) => {
    try {
        const user = await userController.updateUserById(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await userController.deleteUserById(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
