const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const eventController = require('../controllers/event');

// Public routes
router.post('/', authMiddleware , eventController.createEvent);
router.get('/',authMiddleware , eventController.getAllEvents);
router.get('/:eventId', eventController.getEventById);

// Private routes (require authentication)
router.use(authMiddleware); 

router.put('/:eventId', eventController.updateEventById);
router.delete('/:eventId', eventController.deleteEventById);

module.exports = router;
