import { NextApiRequest, NextApiResponse } from 'next';

// Simple XML parsing function
function parseRSSFeed(xmlString: string) {
  const items: any[] = [];
  
  // Extract title, description
  const titleMatch = xmlString.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
  const descriptionMatch = xmlString.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
  
  const feedTitle = titleMatch ? titleMatch[1] : 'Chris Lee Bergstrom';
  const feedDescription = descriptionMatch ? descriptionMatch[1] : 'Entertainment industry and AI insights';
  
  // Extract all items
  const itemMatches = xmlString.match(/<item>[\s\S]*?<\/item>/g);
  
  if (itemMatches) {
    for (const itemXml of itemMatches.slice(0, 5)) {
      const item: any = {};
      
      // Extract title
      const titleMatch = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
      item.title = titleMatch ? titleMatch[1] : '';
      
      // Extract link
      const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
      item.link = linkMatch ? linkMatch[1] : '';
      
      // Extract pub date
      const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      item.pubDate = pubDateMatch ? pubDateMatch[1] : '';
      
      // Extract description/content
      const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      const fullContent = descMatch ? descMatch[1] : '';
      
      // Create content snippet (first 200 chars of text content)
      const textContent = fullContent.replace(/<[^>]*>/g, '').trim();
      item.contentSnippet = textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;
      item.content = fullContent;
      
      // Extract author
      const authorMatch = itemXml.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/);
      item.author = authorMatch ? authorMatch[1] : 'Chris Lee Bergstrom';
      
      items.push(item);
    }
  }
  
  return {
    title: feedTitle,
    description: feedDescription,
    items: items
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Substack RSS feed URL
    const substackFeedUrl = 'https://chrisleebergstrom.substack.com/feed';
    
    // Fetch the RSS feed
    const response = await fetch(substackFeedUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const feedData = await response.text();
    
    // Parse XML using our custom parser
    const feed = parseRSSFeed(feedData);
    
    // Transform the feed data to include only what we need
    const posts = feed.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet,
      content: item.content,
      author: item.author
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