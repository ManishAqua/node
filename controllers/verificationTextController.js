const { VerificationText } = require('../models');
require('dotenv').config();
const s3 = require('../middlewares/s3');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const path = require('path');

const getAll = async (req, res) => {
  try {
    const data = await VerificationText.find();
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
    const data = await VerificationText.findById(req.params.id);
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
    await VerificationText.deleteMany();

    const Image = req.files.Image;
    const ImageUrl = [];
    for (let i = 0; i < Image.length; i++) {
      const key = `verification/images/${Image[i].name}`;
      await s3.uploadFile(process.env.AWS_BUCKET_NAME, key, Image[i].path);
      ImageUrl.push(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`);
    }

    // Create a new entry
    const data = new VerificationText(req.body, ImageUrl);

    const result = await data.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateById = async (req, res) => {
  try {
    const data = await VerificationText.findByIdAndUpdate(req.params.id, req.body, {
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
    const data = await VerificationText.findByIdAndDelete(req.params.id);
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
