const express = require('express');
const router = express.Router();
const chatbot = require('../chatbot');

/**
 * POST /api/chat/message
 * Send a message to the chatbot
 */
router.post('/message', async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chatbot.processMessage(message, language);
    
    res.json({
      success: true,
      message,
      response,
      language,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Chat route error:', error);
    res.status(500).json({ error: 'Error processing message' });
  }
});

/**
 * GET /api/chat/history
 * Get conversation history
 */
router.get('/history', (req, res) => {
  try {
    const history = chatbot.getHistory();
    res.json({
      success: true,
      history,
      count: history.length
    });
  } catch (error) {
    console.error('History route error:', error);
    res.status(500).json({ error: 'Error retrieving history' });
  }
});

/**
 * DELETE /api/chat/history
 * Clear conversation history
 */
router.delete('/history', (req, res) => {
  try {
    chatbot.clearHistory();
    res.json({
      success: true,
      message: 'Conversation history cleared'
    });
  } catch (error) {
    console.error('Clear history route error:', error);
    res.status(500).json({ error: 'Error clearing history' });
  }
});

module.exports = router;