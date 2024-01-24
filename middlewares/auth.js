const { User } = require('../models/user');
const { verifyJwt } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('x-auth');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    const decoded = verifyJwt(token);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }

    req.user = { userId: user._id }; // Attach the user payload to req.user
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;
