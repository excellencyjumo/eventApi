const jwt = require('jsonwebtoken');
require('dotenv').config();

const signJwt = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
  
const verifyJwt = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    signJwt,
    verifyJwt
}