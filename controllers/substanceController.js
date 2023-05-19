const { Substance } = require('../models');

// GET all substance statuses
exports.getSubstances = async (req, res) => {
  try {
    const substances = await Substance.find();
    const response = {
      data: substances,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single substance status by ID
exports.getSubstanceById = async (req, res) => {
  try {
    const substance = await Substance.findById(req.params.id);
    if (!substance) {
      return res.status(404).json({ message: 'Substance Status not found' });
    }
    res.status(200).json(substance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new substance status
exports.createSubstance = async (req, res) => {
  const substance = new Substance({
    name: req.body.name
  });

  try {
    const newSubstance = await substance.save();
    res.status(201).json(newSubstance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing substance status by ID
exports.updateSubstanceById = async (req, res) => {
  try {
    const substance = await Substance.findById(req.params.id);
    if (!substance) {
      return res.status(404).json({ message: 'Substance Status not found' });
    }
    substance.name = req.body.name;
    const updatedSubstance = await substance.save();
    res.status(200).json(updatedSubstance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing substance status by ID
exports.deleteSubstanceById = async (req, res) => {
  try {
    const substance = await Substance.findById(req.params.id);
    if (!substance) {
      return res.status(404).json({ message: 'Substance Status not found' });
    }
    await substance.remove();
    res.status(200).json({ message: 'Substance Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
