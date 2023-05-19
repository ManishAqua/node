const { Height, HeightCm } = require('../models');

exports.getHeightsInFeet = async (req, res) => {
    try {
        const heights = await Height.find();
        const response = {
            data: heights,
          };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrUpdateHeightsInFeet = async (req, res) => {
    try {
        // Extract the min and max heights from the request body
        const { minFeet, minInches, maxFeet, maxInches } = req.body;

        // Calculate the total number of heights in the range
        const numHeights = (maxFeet - minFeet) * 12 + (maxInches - minInches) + 1;

        // Create an array of all heights in the range
        const heights = [];
        for (let i = 0; i < numHeights; i++) {
            const feet = Math.floor(i / 12) + minFeet;
            const inches = (i % 12) + minInches;
            heights.push({ feet, inches });
        }

        // Delete all existing heights in the database
        await Height.deleteMany({});

        // Insert the new heights into the database
        await Height.insertMany(heights);

        // Send a success response
        res.status(200).send({ message: 'Heights added successfully.' });
    } catch (error) {
        // Send an error response
        res.status(500).send({ message: 'Error adding heights to database.' });
    }
};

exports.getHeightsInCentimeters = async (req, res) => {
    try {
        const heights = await HeightCm.find();
        const response = {
            data: heights,
          };
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createOrUpdateHeightsInCentimeters = async (req, res) => {
    try {
        // Extract the min and max heights from the request body
        const { minCm, maxCm } = req.body;

        // Calculate the total number of heights in the range
        const numHeights = maxCm - minCm + 1;

        // Create an array of all heights in the range
        const heights = [];
        for (let i = 0; i < numHeights; i++) {
            const cm = i + minCm;
            heights.push({ cm });
        }

        // Delete all existing heights in the database
        await HeightCm.deleteMany({});

        // Insert the new heights into the database
        await HeightCm.insertMany(heights);

        // Send a success response
        res.status(200).send({ message: 'Heights added successfully.' });
    } catch (error) {
        // Send an error response
        res.status(500).send({ message: 'Error adding heights to database.' });
    }
};
