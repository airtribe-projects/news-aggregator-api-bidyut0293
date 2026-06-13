const { findUserByEmail, updateUserPreferences } = require('../models/userModel');

// Get user preferences
const getPreferences = async (req, res) => {
  try {
    // Get user from authenticated request
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Find full user data
    const fullUser = await findUserByEmail(user.email);
    if (!fullUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      preferences: fullUser.preferences
    });
    
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user preferences
const updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    
    // Validate preferences
    if (!Array.isArray(preferences)) {
      return res.status(400).json({ error: 'Preferences must be an array' });
    }
    
    // Update preferences
    const updatedUser = updateUserPreferences(user.email, preferences);
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      message: 'Preferences updated successfully',
      preferences: updatedUser.preferences
    });
    
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getPreferences, updatePreferences };