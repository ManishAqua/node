const { Martial } = require('../models');

// GET all martial statuses
exports.getMartials = async (req, res) => {
  try {
    const martials = await Martial.find();
    const response = {
      data: martials,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single martial status by ID
exports.getMartialById = async (req, res) => {
  try {
    const martial = await Martial.findById(req.params.id);
    if (!martial) {
      return res.status(404).json({ message: 'Martial Status not found' });
    }
    res.status(200).json(martial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new martial status
exports.createMartial = async (req, res) => {
  const martial = new Martial({
    name: req.body.name
  });

  try {
    const newMartial = await martial.save();
    res.status(201).json(newMartial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing martial status by ID
exports.updateMartialById = async (req, res) => {
  try {
    const martial = await Martial.findById(req.params.id);
    if (!martial) {
      return res.status(404).json({ message: 'Martial Status not found' });
    }
    martial.name = req.body.name;
    const updatedMartial = await martial.save();
    res.status(200).json(updatedMartial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing martial status by ID
exports.deleteMartialById = async (req, res) => {
  try {
    const martial = await Martial.findById(req.params.id);
    if (!martial) {
      return res.status(404).json({ message: 'Martial Status not found' });
    }
    await martial.remove();
    res.status(200).json({ message: 'Martial Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
