require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    },
    newsApi: {
        key: process.env.NEWS_API_KEY || 'your_news_api_key',
        baseUrl: process.env.NEWS_BASE_URL || 'https://newsapi.org/v2'
    }
};