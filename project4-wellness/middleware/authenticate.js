const User = require('../models/User');

const isAuthenticated = async (req, res, next) => {
  if (!req.session.user || !req.session.user._id) {
    return res.status(401).json({ message: "You do not have access." });
  }

  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; 
    next();
  } catch (err) {
    res.status(500).json({ message: "Authentication check failed." });
  }
};



module.exports = {
    isAuthenticated,

}