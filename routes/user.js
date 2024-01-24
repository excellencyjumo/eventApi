const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const userController = require('../controllers/user');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Private routes (require authentication)
router.use(authMiddleware);

router.put('/profile', userController.updateUserProfile);
router.delete('/profile', userController.deleteUserAccount);

module.exports = router;
