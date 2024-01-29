const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { User } = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { signJwt } = require("../utils/jwt");
const userController = require('../controllers/user');

jest.mock('../models/user');
jest.mock('../utils/bcrypt');
jest.mock("../utils/jwt");

describe('User Controller Tests', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
        const req = mockRequest({
          body: {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
          },
        });
        const res = mockResponse();
      
        hashPassword.mockResolvedValue('hashedPassword');
        
        User.mockImplementationOnce(() => ({
          save: jest.fn().mockResolvedValue(),
        }));
        signJwt.mockReturnValue('token');
      
        await userController.registerUser(req, res);
      
        expect(hashPassword).toHaveBeenCalledWith('password123');
        expect(User).toHaveBeenCalledWith({
          username: 'testuser',
          email: 'test@example.com',
          password: 'hashedPassword',
        });
        
        expect(res.header).toHaveBeenCalledWith('x-auth', 'token');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Successfull registration', token: 'token' });
      });
      

    it('should handle registration errors', async () => {
      
      const saveMock = jest.fn().mockRejectedValue(new Error('Mocked error'));
      const req = mockRequest({
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        },
      });
      const res = mockResponse();
      User.mockImplementationOnce(() => ({
        save: saveMock,
      }));

      await userController.registerUser(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('loginUser', () => {
    it('should log in a user', async () => {
      const req = mockRequest({
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
      const res = mockResponse();

      User.findOne.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      comparePassword.mockResolvedValue(true);
      signJwt.mockReturnValue('token');

      await userController.loginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(comparePassword).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(signJwt).toHaveBeenCalledWith('user123');
      expect(res.header).toHaveBeenCalledWith('x-auth', 'token');
      expect(res.json).toHaveBeenCalledWith({ message: 'Successful Login' });
    });

    it('should handle login errors', async () => {
      const req = mockRequest({
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
      const res = mockResponse();

      User.findOne.mockResolvedValue(null);

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should handle password mismatch', async () => {
      const req = mockRequest({
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
      const res = mockResponse();

      User.findOne.mockResolvedValue({
        _id: 'user123',
        email: 'test@example.com',
        password: 'hashedPassword',
      });
      comparePassword.mockResolvedValue(false);

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
    });

    it('should handle login errors', async () => {
      
      const req = mockRequest({
        body: {
          email: 'test@example.com',
          password: 'password123',
        },
      });
      const res = mockResponse();
      User.findOne.mockRejectedValue(new Error('Mocked error'));

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('logoutUser', () => {
    it('should clear token and send logout message', () => {
      const req = mockRequest();
      const res = mockResponse();

      userController.logoutUser(req, res);

      expect(res.header).toHaveBeenCalledWith('x-auth', '');
      expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful' });
    });
  });

  describe('updateUserProfile', () => {
    it('should update user profile', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
        body: {
          username: 'newUsername',
          email: 'new@example.com',
        },
      });
      const res = mockResponse();

      User.findByIdAndUpdate.mockResolvedValue({
        _id: 'user123',
        username: 'newUsername',
        email: 'new@example.com',
      });

      await userController.updateUserProfile(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user123', { username: 'newUsername', email: 'new@example.com' }, { new: true });
      expect(res.json).toHaveBeenCalledWith({
        _id: 'user123',
        username: 'newUsername',
        email: 'new@example.com',
      });
    });

    it('should handle user not found during update', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
        body: {
          username: 'newUsername',
          email: 'new@example.com',
        },
      });
      const res = mockResponse();

      User.findByIdAndUpdate.mockResolvedValue(null);

      await userController.updateUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle update errors', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
        body: {
          username: 'newUsername',
          email: 'new@example.com',
        },
      });
      const res = mockResponse();

      User.findByIdAndUpdate.mockRejectedValue(new Error('Mocked error'));

      await userController.updateUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  describe('deleteUserAccount', () => {
    it('should delete user account', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
      });
      const res = mockResponse();

      User.findByIdAndDelete.mockResolvedValue({
        _id: 'user123',
      });

      await userController.deleteUserAccount(req, res);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should handle user not found during deletion', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
      });
      const res = mockResponse();

      User.findByIdAndDelete.mockResolvedValue(null);

      await userController.deleteUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle deletion errors', async () => {
      const req = mockRequest({
        user: { userId: 'user123' },
      });
      const res = mockResponse();

      User.findByIdAndDelete.mockRejectedValue(new Error('Mocked error'));

      await userController.deleteUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });
});
