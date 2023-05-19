const { ScreenVisibility } = require('../models');

const getAll = async (req, res) => {
    try {
        const data = await ScreenVisibility.find();
        const response = {
            data: data,
          };
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const data = await ScreenVisibility.findById(req.params.id);
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    try {
        // Delete all previous entries
        await ScreenVisibility.deleteMany();

        // Create a new entry
        const data = new ScreenVisibility(req.body);
        const result = await data.save();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateById = async (req, res) => {
    try {
        const data = await ScreenVisibility.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const data = await ScreenVisibility.findByIdAndDelete(req.params.id);
        if (!data) {
            res.status(404).json({ error: 'Data not found' });
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAll, getById, create, updateById, deleteById };
