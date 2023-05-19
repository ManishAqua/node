const { Country } = require('../models');

exports.getAllStates = async (req, res) => {
    try {
        const country = await Country.findById(req.body.countryId);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country.states);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getStateById = async (req, res) => {
    try {
        const country = await Country.findById(req.body.countryId);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.id(req.body.stateId);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        res.json(state);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
