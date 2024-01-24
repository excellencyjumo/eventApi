const { Ticket, Event } = require('../models/ticket');

const ticketController = {
  createTicket: async (req, res) => {
    try {
      const { price, eventId } = req.body;
      const userId = req.user.userId;

      const ticket = new Ticket({ price, user: userId, event: eventId });
      await ticket.save();

      res.status(201).json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllTickets: async (req, res) => {
    try {
      const userId = req.user.userId;

      const tickets = await Ticket.find({ user: userId }).populate('event');

      res.json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTicketById: async (req, res) => {
    try {
      const ticketId = req.params.ticketId;
      const userId = req.user.userId;

      const ticket = await Ticket.findOne({ _id: ticketId, user: userId }).populate('event');

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found or unauthorized' });
      }

      res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTicketById: async (req, res) => {
    try {
      const ticketId = req.params.ticketId;
      const userId = req.user.userId;
      const { price, eventId } = req.body;

      const ticket = await Ticket.findOneAndUpdate(
        { _id: ticketId, user: userId },
        { price, event: eventId },
        { new: true }
      ).populate('event');

      if (!ticket) {
        return res.status(404).json({ error: 'Ticket not found or unauthorized' });
      }

      res.json(ticket);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTicketById: async (req, res) => {
    try {
      const ticketId = req.params.ticketId;
      const userId = req.user.userId;

      const ticket = await Ticket.findOneAndDelete({ _id: ticketId, user: userId });

      if (!ticket) {
        return res.status
        (404).json({ error: 'Ticket not found or unauthorized' });
      }

      res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  payForEvent: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { eventId, amount } = req.body;

      // Check if the event exists
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      // Check if the user has already paid for the event
      if (event.attendees.includes(userId)) {
        return res.status(400).json({ error: 'User has already paid for the event' });
      }

      // Assuming  a function to handle payment processing
      // const paymentSuccess = await processPayment(amount);

      // Simulating a successful payment
      const paymentSuccess = true;

      if (!paymentSuccess) {
        return res.status(400).json({ error: 'Payment failed' });
      }

      // Updated Event model to add the user to the attendees array
      event.attendees.push(userId);
      await event.save();

      res.json({ message: 'Payment successful', event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = ticketController;
