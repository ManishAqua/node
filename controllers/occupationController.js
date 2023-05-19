const { Occupation } = require('../models');

// GET all occupation
exports.getOccupation = async (req, res) => {
  try {
    const occupation = await Occupation.find();
    const response = {
      data: occupation,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single occupation by ID
exports.getOccupationById = async (req, res) => {
  try {
    const occupation = await Occupation.findById(req.params.id);
    if (!occupation) {
      return res.status(404).json({ message: 'Occupation not found' });
    }
    res.status(200).json(occupation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new occupation
exports.createOccupation = async (req, res) => {
  const occupation = new Occupation({
    name: req.body.name
  });

  try {
    const newOccupation = await occupation.save();
    res.status(201).json(newOccupation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing occupation by ID
exports.updateOccupationById = async (req, res) => {
  try {
    const occupation = await Occupation.findById(req.params.id);
    if (!occupation) {
      return res.status(404).json({ message: 'Occupation not found' });
    }
    occupation.name = req.body.name;
    const updatedOccupation = await occupation.save();
    res.status(200).json(updatedOccupation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing occupation by ID
exports.deleteOccupationById = async (req, res) => {
  try {
    const occupation = await Occupation.findById(req.params.id);
    if (!occupation) {
      return res.status(404).json({ message: 'Occupation not found' });
    }
    await occupation.remove();
    res.status(200).json({ message: 'Occupation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
