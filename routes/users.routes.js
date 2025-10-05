const express = require('express');
const UserController = require('../controllers/users.controller');
const userRouter = express.Router();

// create user
userRouter.post('/create', UserController);

module.exports = userRouter;
