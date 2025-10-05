const express = require('express');

const chatsController = require('../controllers/chats.controller');
const chatRouter = express.Router();

// send message
chatRouter.post('/send', chatsController.chatsController);

chatRouter.get('/all', chatsController.getAllChatsController);

module.exports = chatRouter;
