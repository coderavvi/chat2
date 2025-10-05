const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const userRouter = require('./routes/users.routes.js');
const chatRouter = require('./routes/chats.route.js');
const { chatsController } = require('./controllers/chats.controller.js');

const PORT = process.env.PORT;

// Middleware
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

// user routes
app.use('/api/user', userRouter);

// chat routes
app.use('/api/chat', chatRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
