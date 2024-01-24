const {model,Schema} = require('mongoose');

// Ticket Schema
const ticketSchema = new Schema({
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

const Ticket = model('Ticket', ticketSchema);

module.exports = {Ticket};