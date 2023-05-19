const { Gender } = require('../models');

// GET all genders
exports.getGenders = async (req, res) => {
  try {
    const genders = await Gender.find();
    const response = {
      data: genders,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single gender by ID
exports.getGenderById = async (req, res) => {
  try {
    const gender = await Gender.findById(req.params.id);
    if (!gender) {
      return res.status(404).json({ message: 'Gender not found' });
    }
    res.status(200).json(gender);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new gender
exports.createGender = async (req, res) => {
  const gender = new Gender({
    name: req.body.name
  });

  try {
    const newGender = await gender.save();
    res.status(201).json(newGender);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing gender by ID
exports.updateGenderById = async (req, res) => {
  try {
    const gender = await Gender.findById(req.params.id);
    if (!gender) {
      return res.status(404).json({ message: 'Gender not found' });
    }
    gender.name = req.body.name;
    const updatedGender = await gender.save();
    res.status(200).json(updatedGender);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing gender by ID
exports.deleteGenderById = async (req, res) => {
  try {
    const gender = await Gender.findById(req.params.id);
    if (!gender) {
      return res.status(404).json({ message: 'Gender not found' });
    }
    await gender.remove();
    res.status(200).json({ message: 'Gender deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
