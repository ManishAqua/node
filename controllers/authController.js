const { User } = require('../models');
const { generateToken } = require('../config/token');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = generateToken(user._id, user.role);
    const response = {
      role: user.role,
      token,
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
