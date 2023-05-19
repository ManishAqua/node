const { Food } = require('../models');

// GET all food statuses
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    const response = {
      data: foods,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single food status by ID
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food Status not found' });
    }
    res.status(200).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new food status
exports.createFood = async (req, res) => {
  const food = new Food({
    name: req.body.name
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing food status by ID
exports.updateFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food Status not found' });
    }
    food.name = req.body.name;
    const updatedFood = await food.save();
    res.status(200).json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing food status by ID
exports.deleteFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food Status not found' });
    }
    await food.remove();
    res.status(200).json({ message: 'Food Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
