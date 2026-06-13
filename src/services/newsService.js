const config = require('../config/config');

// Simple in-memory cache for news articles
const newsCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Fetch news from external API
const fetchNews = async (preferences = [], country = 'us', language = 'en') => {
    const cacheKey = `${preferences.sort().join(',')}-${country}-${language}`;

    const cached = newsCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.data;
    }

    // No API key configured — return mock data for local dev
    if (!config.newsApi.key) {
        return getMockNews(preferences);
    }

    let url = `${config.newsApi.baseUrl}/top-headlines?country=${country}&lang=${language}&apikey=${config.newsApi.key}&max=10`;

    if (preferences.length > 0) {
        url += `&category=${preferences[0]}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
    }
    const data = await response.json();

    const articles = (data.articles || []).map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source?.name || article.source?.title || 'Unknown',
        publishedAt: article.publishedAt,
        imageUrl: article.image || article.urlToImage
    }));

    newsCache.set(cacheKey, { data: articles, timestamp: Date.now() });

    return articles;
};

// Mock news for when API key is not configured
const getMockNews = (preferences) => [
    {
        title: `Top story in ${preferences[0] || 'general'}`,
        description: 'This is a sample news article for demonstration purposes.',
        url: 'https://example.com/news/1',
        source: 'Demo News',
        publishedAt: new Date().toISOString(),
        imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
        title: `Breaking: Important update in ${preferences[0] || 'general'}`,
        description: 'Another sample article showing news aggregation capabilities.',
        url: 'https://example.com/news/2',
        source: 'Demo Times',
        publishedAt: new Date().toISOString(),
        imageUrl: 'https://via.placeholder.com/300x200'
    }
];

module.exports = { fetchNews };
