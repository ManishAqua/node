const { Country } = require('../models');

exports.getCityById = async (req, res) => {
    try {
        const country = await Country.findOne({ 'states.cities._id': req.body.cityId });
        if (!country) {
            return res.status(404).json({ error: 'City not found' });
        }
        const city = country.states.reduce((acc, state) => {
            const foundCity = state.cities.id(req.body.cityId);
            return foundCity ? foundCity : acc;
        }, null);
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllCities = async (req, res) => {
    try {
        const country = await Country.findById(req.body.countryId);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.id(req.body.stateId);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        res.json(state.cities);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};