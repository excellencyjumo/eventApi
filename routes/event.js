const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const eventController = require('../controllers/event');

// Public routes
router.post('/events', eventController.createEvent);
router.get('/events', eventController.getAllEvents);
router.get('/events/:eventId', eventController.getEventById);

// Private routes (require authentication)
router.use(authMiddleware); // Apply auth middleware for the routes below

router.put('/events/:eventId', eventController.updateEventById);
router.delete('/events/:eventId', eventController.deleteEventById);

module.exports = router;
