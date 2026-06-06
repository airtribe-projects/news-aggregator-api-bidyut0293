const { fetchNews } = require('../services/newsService');
const { findUserByEmail } = require('../models/userModel');

// Get personalized news
const getNews = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Get full user data including preferences
    const fullUser = findUserByEmail(user.email);
    if (!fullUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Fetch news based on user preferences
    const news = await fetchNews(fullUser.preferences);
    
    res.status(200).json({
      news,
      count: news.length
    });
    
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getNews };