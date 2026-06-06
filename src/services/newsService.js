const config = require('../config/config');

// Simple in-memory cache for news articles
const newsCache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // Cache Time-To-Live: 10 minutes

// Fetch news from external API
const fetchNews = async (preferences = [], country = 'us', language = 'en') => {
    const cacheKey = `${preferences.sort().join(',')}-${country}-${language}`;

    // Check cache first
    const cached = newsCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.data;
    }

    try {
        // Build API request URL
        let url = `${config.newsApi.baseUrl}/top-headlines?country=${country}&lang=${language}&apikey=${config.newsApi.key}&max=10`;

        // Add category filters based on user preferences
        if (preferences.length > 0) {
            const category = preferences[0]; // For simplicity, use the first preference as category
            url += `&category=${category}`;
        }

        // Make API request
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`News API error: ${response.status}`);
        }
        const data = await response.json();

        // Format news articles (works with both GNews API and NewsAPI format)
        const articles = (data.articles || []).map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            source: article.source?.name || article.source?.title || 'Unknown',
            publishedAt: article.publishedAt,
            imageUrl: article.image || article.urlToImage
        }));

        // Cache the results
        newsCache.set(cacheKey, { data: articles, timestamp: Date.now() });

        return articles;
    } catch (error) {
        console.error('Error fetching news:', error.message);

        //Return mock news for testing/development
        return getMockNews(preferences);
    }
};

// Mock news for when API is not configured or fails
const getMockNews = (preferences) => {
  const mockArticles = [
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
  
  return mockArticles;
};

module.exports = { fetchNews };