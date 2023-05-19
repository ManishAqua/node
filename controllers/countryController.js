const { Country } = require('../models');

exports.createCountry = async (req, res) => {
    try {
        const country = new Country({
            name: req.body.name
        });
        await country.save();
        res.json(country);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        const response = {
            data: countries,
          };
        res.json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findById(req.body.id);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createState = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = {
            name: req.body.name,
            cities: []
        };
        country.states.push(state);
        await country.save();
        res.json(state);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createCity = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.find(s => s.name === req.body.stateName);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        const city = {
            name: req.body.name,
            status: true
        };
        state.cities.push(city);
        await country.save();
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateCountry = async (req, res) => {
    try {
        const country = await Country.findOneAndUpdate(
            { name: req.body.oldName },
            { name: req.body.newName },
            { status: req.body.status},
            { new: true }
        );
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateState = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.find(s => s.name === req.body.oldName);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        state.name = req.body.newName;
        await country.save();
        res.json(state);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateCity = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.find(s => s.name === req.body.stateName);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        const city = state.cities.find(c => c.name === req.body.oldName);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        city.name = req.body.newName;
        city.status = req.body.newStatus;
        await country.save();
        res.json(city);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteCountry = async (req, res) => {
    try {
        const country = await Country.findOneAndDelete({ name: req.body.name });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json({ message: 'Country deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteState = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.find(s => s.name === req.body.name);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        state.remove();
        await country.save();
        res.json({ message: 'State deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteCity = async (req, res) => {
    try {
        const country = await Country.findOne({ name: req.body.countryName });
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        const state = country.states.find(s => s.name === req.body.stateName);
        if (!state) {
            return res.status(404).json({ error: 'State not found' });
        }
        const city = state.cities.find(c => c.name === req.body.name);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        city.remove();
        await country.save();
        res.json({ message: 'City deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};  