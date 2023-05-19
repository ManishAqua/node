const { Religion } = require('../models');

// GET all religion statuses
exports.getReligions = async (req, res) => {
  try {
    const religions = await Religion.find();
    const response = {
      data: religions,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single religion status by ID
exports.getReligionById = async (req, res) => {
  try {
    const religion = await Religion.findById(req.params.id);
    if (!religion) {
      return res.status(404).json({ message: 'Religion Status not found' });
    }
    res.status(200).json(religion);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new religion status
exports.createReligion = async (req, res) => {
  const religion = new Religion({
    name: req.body.name
  });

  try {
    const newReligion = await religion.save();
    res.status(201).json(newReligion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing religion status by ID
exports.updateReligionById = async (req, res) => {
  try {
    const religion = await Religion.findById(req.params.id);
    if (!religion) {
      return res.status(404).json({ message: 'Religion Status not found' });
    }
    religion.name = req.body.name;
    const updatedReligion = await religion.save();
    res.status(200).json(updatedReligion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing religion status by ID
exports.deleteReligionById = async (req, res) => {
  try {
    const religion = await Religion.findById(req.params.id);
    if (!religion) {
      return res.status(404).json({ message: 'Religion Status not found' });
    }
    await religion.remove();
    res.status(200).json({ message: 'Religion Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
