const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const { ROLES } = require('../config/constants');
require('dotenv').config();
const s3 = require('../middlewares/s3');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const path = require('path');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserByPhoneNumber = async (req, res, next) => {
    try {
        const { phoneNumber } = req.body;

        // Perform any necessary input validation or sanitization for the phoneNumber

        const user = await User.findOne({ phoneNumber });

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        const response = {
            data: user,
        };

        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(JSON.stringify({ errors: errors.array() }));
    }

    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400);
            throw new Error('Username already taken');
        }

        // Check if the provided role is valid
        if (!Object.values(ROLES).includes(role)) {
            res.status(400);
            throw new Error('Invalid role');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(200).send('User registered successfully');
    } catch (error) {
        next(error);
    }
};

const saveUserData = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error(JSON.stringify({ errors: errors.array() }));
    }

    const { phoneNumber, relation, firstname, lastname, email, password, gender, dob, height, pincode, education, occupation, worksat, income, linkedin, martial, language, religion, food, smoke, drink, substance } = req.body;

    try {
        let existingUser = await User.findOne({ phoneNumber });
        if (!existingUser) {
            throw new Error(JSON.stringify({ error: 'User not found' }));
        } else if (!existingUser.verified) {
            throw new Error(JSON.stringify({ error: 'Phone number not verified' }));
        }

        // Update the existing user with the new details
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.relation = relation;
        existingUser.firstname = firstname;
        existingUser.lastname = lastname;
        existingUser.email = email;
        existingUser.password = hashedPassword;
        existingUser.gender = gender;
        existingUser.dob = dob;
        existingUser.height = height;
        existingUser.pincode = pincode;
        existingUser.education = education;
        existingUser.occupation = occupation;
        existingUser.worksat = worksat;
        existingUser.income = income;
        existingUser.linkedin = linkedin;
        existingUser.martial = martial;
        existingUser.language = language;
        existingUser.religion = religion;
        existingUser.food = food;
        existingUser.smoke = smoke;
        existingUser.drink = drink;
        existingUser.substance = substance;

        await existingUser.save();

        if (res) { // check if res is defined
            res.status(200).json({
                message: 'User data saved successfully',
                user: existingUser,
            });
        }
    } catch (err) {
        if (err.message.includes('User not found')) {
            res.status(404).json({
                error: 'User not found',
            });
        } else if (err.message.includes('Phone number not verified')) {
            res.status(401).json({
                error: 'Phone number not verified',
            });
        } else {
            next(err);
            if (res) { // check if res is defined
                res.status(500).json({
                    error: err.message,
                });
            }
        }
    }
};

const uploadImages = async (user, files) => {
    const uploadFile = async (user, type, file) => {
        const key = `users/${user._id}/${type}/${file.name}`;
        await s3.uploadFile(process.env.AWS_BUCKET_NAME, key, file.path);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    };

    // Save profile images to S3
    if (files.profileImages) {
        const profileImagesUrls = await Promise.all(files.profileImages.map((file) => uploadFile(user, 'profile-images', file)));
        user.profileImages = profileImagesUrls;
    }

    // Save family images to S3
    if (files.familyImages) {
        const familyImagesUrls = await Promise.all(files.familyImages.map((file) => uploadFile(user, 'family-images', file)));
        user.familyImages = familyImagesUrls;
    }

    // Save hobby images to S3
    if (files.hobbyImages) {
        const hobbyImagesUrls = await Promise.all(files.hobbyImages.map((file) => uploadFile(user, 'hobby-images', file)));
        user.hobbyImages = hobbyImagesUrls;
    }

    // Save verification images to S3
    if (files.verificationImages) {
        const verificationImagesUrls = await Promise.all(files.verificationImages.map((file) => uploadFile(user, 'verification-images', file)));
        user.verificationImages = verificationImagesUrls;
    }
};

module.exports = {
    saveUserData,
};


const getUserImages = async (req, res, next) => {
    const { phoneNumber } = req.body;

    try {
        let existingUser = await User.findOne({ phoneNumber });
        if (!existingUser) {
            throw new Error(JSON.stringify({ error: 'User not found' }));
        } else if (!existingUser.verified) {
            throw new Error(JSON.stringify({ error: 'Phone number not verified' }));
        }

        const profileImagesUrls = await Promise.all(existingUser.profileImages.map(async (url) => {
            const key = url.split('https://')[1];
            const filePath = `/tmp/${key}`;
            await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
            return filePath;
        }));

        const familyImagesUrls = await Promise.all(existingUser.familyImages.map(async (url) => {
            const key = url.split('https://')[1];
            const filePath = `/tmp/${key}`;
            await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
            return filePath;
        }));

        const hobbyImagesUrls = await Promise.all(existingUser.hobbyImages.map(async (url) => {
            const key = url.split('https://')[1];
            const filePath = `/tmp/${key}`;
            await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
            return filePath;
        }));

        const verificationImagesUrls = await Promise.all(existingUser.verificationImages.map(async (url) => {
            const key = url.split('https://')[1];
            const filePath = `/tmp/${key}`;
            await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
            return filePath;
        }));

        return {
            profileImages: profileImagesUrls,
            familyImages: familyImagesUrls,
            hobbyImages: hobbyImagesUrls,
            verificationImages: verificationImagesUrls
        };
    } catch (err) {
        if (err.message.includes('User not found')) {
            res.status(404).json({
                error: 'User not found',
            });
        } else if (err.message.includes('Phone number not verified')) {
            res.status(401).json({
                error: 'Phone number not verified',
            });
        } else {
            next(err);
            if (res) { // check if res is defined
                res.status(500).json({
                    error: err.message,
                });
            }
        }
    }
    const profileImagesUrls = await Promise.all(existingUser.profileImages.map(async (url) => {
        const key = url.split('https://')[1];
        const filePath = `/tmp/${key}`;
        await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
        return filePath;
    }));

    const familyImagesUrls = await Promise.all(existingUser.familyImages.map(async (url) => {
        const key = url.split('https://')[1];
        const filePath = `/tmp/${key}`;
        await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
        return filePath;
    }));

    const hobbyImagesUrls = await Promise.all(existingUser.hobbyImages.map(async (url) => {
        const key = url.split('https://')[1];
        const filePath = `/tmp/${key}`;
        await s3.downloadFile(process.env.AWS_BUCKET_NAME, key, filePath);
        return filePath;
    }));

    return {
        profileImages: profileImagesUrls,
        familyImages: familyImagesUrls,
        hobbyImages: hobbyImagesUrls,
    };
};

const updateUserById = async (req, res, next) => {
    const { username, password, role } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        user.username = username || user.username;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        // Check if the provided role is valid
        if (role && !Object.values(ROLES).includes(role)) {
            res.status(400);
            throw new Error('Invalid role');
        }
        user.role = role || user.role;

        await user.save();
        res.status(200).send('User updated successfully');
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        await user.deleteOne();
        res.status(200).send('User deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserByPhoneNumber,
    createUser,
    saveUserData,
    updateUserById,
    deleteUserById,
    getUserImages
};
