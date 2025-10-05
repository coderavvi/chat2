const openAI = require('openai');
const {
  saveUserMessage,
  getUserHistory,
  saveAgentMessage,
} = require('../services/querries');
require('dotenv').config();

const db = require('../db/db');

const openai = new openAI.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function chatsController(req, res) {
  try {
    const { userId, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'message cannot be empty' });
    }
    //  handle chats
    try {
      //save user message
      saveUserMessage(userId, message, res);

      const history = await getUserHistory(userId);

      console.log(history);

      const messages = [
        {
          role: 'system',
          content: `Your name is Ladi. You are a compassionate and supportive mental health assistant. Your role is to:
- Listen actively and empathetically
- Provide emotional support and validation
- Encourage healthy coping strategies
- Never diagnose or replace professional help
- Suggest professional help when appropriate
- Keep responses concise and supportive

Remember: You're here to support, not to diagnose or treat.`,
        },
        {
          role: 'user',
          content: 'Your name is Ladi',
        },
        ...history.map((msg) => ({
          role: msg.role,
          content: msg.message,
        })),
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.3,
        max_completion_tokens: 500,
      });

      const aiResponse = response.choices[0].message.content;

      // save ai assistant's response
      saveAgentMessage(userId, aiResponse);
      return res.json({
        assistant: aiResponse,
      });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: 'failed to send message to openAi',
    });
  }
}

async function getAllChatsController(req, res) {
  const { userId } = req.body;

  // fetch all chats based on userId
  const userChatHistory = await getUserHistory(userId);
  console.log(userChatHistory);

  return res.json(userChatHistory);
}

module.exports = { chatsController, getAllChatsController };
