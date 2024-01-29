const { User } = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const {signJwt} = require("../utils/jwt");

const userController = {
    registerUser: async (req, res) => {
      try {
        const { username, email, password } = req.body;
  
        const hashedPassword = await hashPassword(password);
  
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
  
        const token = signJwt(user._id);
  
        res.header('x-auth', token);
        res.status(201).json({ message:"Successfull registration", token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    loginUser: async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
  
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log(user);
        const isPasswordMatch = await comparePassword(password, user.password);
  
        if (!isPasswordMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const token = signJwt(user._id);
  
        res.header('x-auth', token);
        res.json({ message:"Successful Login" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    logoutUser: (req, res) => {
      // Clear token in the response header
      res.header('x-auth', '');
      res.json({ message: 'Logout successful' });
    },
  
    updateUserProfile: async (req, res) => {
      try {
        const userId = req.user.userId;
        const { username, email } = req.body;
  
        const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    deleteUserAccount: async (req, res) => {
      try {
        const userId = req.user.userId;
  
        const user = await User.findByIdAndDelete(userId);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
};
  
module.exports = userController;