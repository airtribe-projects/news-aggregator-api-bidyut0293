require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required. Set it in .env (see .env.example).');
}

module.exports = {
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    },
    newsApi: {
        key: process.env.NEWS_API_KEY || null,
        baseUrl: process.env.NEWS_BASE_URL || 'https://gnews.io/api/v4'
    }
};
