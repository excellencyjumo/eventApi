const express = require('express');
const app = express();
require('dotenv').config();

//database connection
const db = require('./config/dB');

//route-files
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const ticketRoutes = require('./routes/ticket');

app.use(express.json());

app.use('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;

//start database connection
db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


