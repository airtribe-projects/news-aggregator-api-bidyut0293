const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { getPreferences, updatePreferences } = require('../controllers/preferencesController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/preferences', authenticateToken, getPreferences);
router.put('/preferences', authenticateToken, updatePreferences);

module.exports = router;