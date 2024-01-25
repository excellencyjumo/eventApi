const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const ticketController = require('../controllers/ticket');

// Public routes
router.post('/tickets', ticketController.createTicket);
router.get('/tickets', authMiddleware, ticketController.getAllTickets);
router.get('/tickets/:ticketId', authMiddleware, ticketController.getTicketById);

// Private routes (require authentication)
router.use(authMiddleware);

router.put('/tickets/:ticketId', ticketController.updateTicketById);
router.delete('/tickets/:ticketId', ticketController.deleteTicketById);
router.post('/pay-for-event', ticketController.payForEvent);

module.exports = router;
