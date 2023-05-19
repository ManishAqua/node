const { Language } = require('../models');

// GET all language statuses
exports.getLanguages = async (req, res) => {
  try {
    const languages = await Language.find();
    const response = {
      data: languages,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single language status by ID
exports.getLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: 'Language Status not found' });
    }
    res.status(200).json(language);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new language status
exports.createLanguage = async (req, res) => {
  const language = new Language({
    name: req.body.name
  });

  try {
    const newLanguage = await language.save();
    res.status(201).json(newLanguage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT (update) an existing language status by ID
exports.updateLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: 'Language Status not found' });
    }
    language.name = req.body.name;
    const updatedLanguage = await language.save();
    res.status(200).json(updatedLanguage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE an existing language status by ID
exports.deleteLanguageById = async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: 'Language Status not found' });
    }
    await language.remove();
    res.status(200).json({ message: 'Language Status deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
