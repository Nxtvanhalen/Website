import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Dynamic import of rss-parser to avoid build issues
    const Parser = (await import('rss-parser')).default;
    
    // Substack RSS feed URL
    const substackFeedUrl = 'https://chrisleebergstrom.substack.com/feed';
    
    // Fetch the RSS feed
    const response = await fetch(substackFeedUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const feedData = await response.text();
    
    // Parse XML to extract posts
    const parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'content'],
          ['dc:creator', 'author']
        ]
      }
    });
    
    const feed = await parser.parseString(feedData);
    
    // Transform the feed data to include only what we need
    const posts = feed.items.slice(0, 5).map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet ? item.contentSnippet.substring(0, 200) + '...' : '',
      content: item.content || item.description || '',
      author: item.author || item.creator || 'Chris Lee Bergstrom'
    }));
    
    res.status(200).json({
      success: true,
      posts: posts,
      feedTitle: feed.title,
      feedDescription: feed.description
    });
    
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch Substack feed',
      posts: []
    });
  }
}