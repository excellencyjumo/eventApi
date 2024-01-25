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

app.use('/api', (req, res,next) => {
  if(req.originalUrl=='/api'){
    return res.status(200).json({ message: 'Welcome to the API' });
  }
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);

app.use((req,res,next)=>{
  next(new Error(`${req.url} is not available.`));
})
//error handling
app.use((error,req,res,next)=>{
  res.status(404).json({message: error.message});
})

const PORT = process.env.PORT || 3000;

//start database connection
db();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


