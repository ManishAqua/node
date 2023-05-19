const { Education } = require('../models');

// GET all education
exports.getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    const response = {
      data: education,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single education by ID
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new education
exports.createEducation = async (req, res) => {
  const education = new Education({
    name: req.body.name
  });

  try {
    const newEducation = await education.save();
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing education by ID
exports.updateEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    education.name = req.body.name;
    const updatedEducation = await education.save();
    res.status(200).json(updatedEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing education by ID
exports.deleteEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education not found' });
    }
    await education.remove();
    res.status(200).json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
