const jwt = require('jsonwebtoken');
require('dotenv').config();

const signJwt = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};
  
const verifyJwt = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    signJwt,
    verifyJwt
}