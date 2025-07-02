import { NextApiRequest, NextApiResponse } from 'next';

// Helper function to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&#8217;': "'",
    '&#8212;': "—",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#128771;': '🜃',
    '&#128527;': '😏',
    '&#8230;': '…',
    '&#129763;': '🦣',
    '&#128526;': '😎',
    '&#233;': 'é',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' '
  };
  
  let decodedText = text;
  for (const [entity, replacement] of Object.entries(entities)) {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), replacement);
  }
  return decodedText;
}

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
      
      // Extract content:encoded (full content) first, fallback to description
      const contentMatch = itemXml.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
      const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/);
      
      // Use content:encoded if available, otherwise use description
      const fullContent = contentMatch ? contentMatch[1] : (descMatch ? descMatch[1] : '');
      
      // Create content snippet (first 200 chars of text content)
      const textContent = fullContent.replace(/<[^>]*>/g, '').trim();
      const decodedTextContent = decodeHTMLEntities(textContent);
      item.contentSnippet = decodedTextContent.length > 200 ? decodedTextContent.substring(0, 200) + '...' : decodedTextContent;
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