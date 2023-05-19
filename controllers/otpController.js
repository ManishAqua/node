const twilio = require('twilio');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let otpMap = new Map();

exports.sendOtp = (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    client.messages
        .create({
            body: `Your verification code for Wedsin account is ${otp}`,
            from: process.env.TWILIO_NUMBER,
            to: phoneNumber,
        })
        .then(() => {
            otpMap.set(phoneNumber, otp);
            res.json({
                message: 'OTP sent successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
};

exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Verify the OTP here
    if (otpMap.has(phoneNumber) && otpMap.get(phoneNumber) == otp) {
        otpMap.delete(phoneNumber);
        try {
            let user = await User.findOne({ phoneNumber });
            if (!user) {
                user = new User({ phoneNumber }); // Set a default username if needed
            } else if (user.verified) {
                // Generate and send JWT token
                const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET);
                return res.json({
                    message: 'Phone number already verified',
                    user,
                    token: token
                });
            }
            user.verified = true;
            await user.save();

            // Generate and send JWT token
            const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET);
            res.json({
                message: 'Phone Verification Successful',
                token: token,
            });
        } catch (err) {
            res.status(500).json({
                error: err.message,
            });
        }
    } else {
        res.status(401).json({
            error: 'Invalid OTP',
        });
    }
};
