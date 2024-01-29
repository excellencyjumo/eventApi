const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const ticketController = require('../controllers/ticket');

// Public routes
router.post('/', authMiddleware, ticketController.createTicket);
router.get('/', authMiddleware, ticketController.getAllTickets);
router.get('/:ticketId', authMiddleware, ticketController.getTicketById);

// Private routes (require authentication)
router.use(authMiddleware);

router.put('/:ticketId', ticketController.updateTicketById);
router.delete('/:ticketId', ticketController.deleteTicketById);
router.post('/pay-for-event', ticketController.payForEvent);

module.exports = router;
