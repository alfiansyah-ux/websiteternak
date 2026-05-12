const generateAiResponse = (message) => {
  const normalized = message?.toLowerCase() || '';
  if (normalized.includes('feed')) {
    return 'For feed optimization, consider tracking daily intake and grouping animals by nutritional needs. I can also help you monitor stock levels.';
  }
  if (normalized.includes('health') || normalized.includes('sick')) {
    return 'Monitor vital signs closely and keep vaccinations up to date. I recommend recording any symptoms and reviewing them weekly.';
  }
  if (normalized.includes('order') || normalized.includes('market')) {
    return 'Use the marketplace dashboard to compare product prices and place customer orders from available stock.';
  }
  if (normalized.includes('milk') || normalized.includes('meat') || normalized.includes('production')) {
    return 'You can enter daily production data under the Production Management module and view trends in the analytics dashboard.';
  }
  return 'Hello! I can help with farm productivity, livestock health, marketplace ordering, and production analytics. What would you like to do today?';
};

const chat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Please provide a message.' });
    }

    const response = generateAiResponse(message);
    res.json({ reply: response });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { chat };