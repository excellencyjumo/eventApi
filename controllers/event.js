const { Event } = require('../models/event');

const eventController = {
  createEvent: async (req, res) => {
    try {
      const { title, date } = req.body;
      const organizerId = req.user.userId;

      const event = new Event({ title, date, organizer: organizerId });
      await event.save();

      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;

      const events = await Event.find()
        .sort({ 'attendees.length': -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('attendees');

      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getEventById: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findById(eventId).populate('attendees');

      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateEventById: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const { title, date } = req.body;
      const organizerId = req.user.userId;

      const event = await Event.findOneAndUpdate(
        { _id: eventId, organizer: organizerId },
        { title, date },
        { new: true }
      );

      if (!event) {
        return res.status(404).json({ error: 'Event not found or unauthorized' });
      }

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteEventById: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const organizerId = req.user.userId;

      const event = await Event.findOneAndDelete({ _id: eventId, organizer: organizerId });

      if (!event) {
        return res.status(404).json({ error: 'Event not found or unauthorized' });
      }

      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = eventController;
