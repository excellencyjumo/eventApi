const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const eventController = require('../controllers/event');

// Public routes
router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

// Private routes (require authentication)
router.use(authMiddleware); // Apply auth middleware for the routes below

router.put('/:eventId', eventController.updateEventById);
router.delete('/:eventId', eventController.deleteEventById);

module.exports = router;
