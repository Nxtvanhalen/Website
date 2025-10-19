import { NextApiRequest, NextApiResponse } from 'next';
import { XMLParser } from 'fast-xml-parser';

// Simple in-memory cache
let cachedData: { posts: any[], feedTitle: string, feedDescription: string, timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set cache headers for client-side caching
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

  try {
    // Check cache first
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return res.status(200).json({
        success: true,
        posts: cachedData.posts,
        feedTitle: cachedData.feedTitle,
        feedDescription: cachedData.feedDescription,
        cached: true
      });
    }
    // Substack RSS feed URL
    const substackFeedUrl = 'https://chrisleebergstrom.substack.com/feed';
    
    // Fetch the RSS feed
    const response = await fetch(substackFeedUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const feedData = await response.text();
    
    // Configure the XML parser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: true,
      trimValues: true,
      parseAttributeValue: true,
      processEntities: true,
      htmlEntities: true
    });
    
    // Parse the XML
    const parsedData = parser.parse(feedData);
    const channel = parsedData?.rss?.channel;
    
    if (!channel) {
      throw new Error('Invalid RSS feed structure');
    }
    
    // Extract feed metadata
    const feedTitle = channel.title || 'Chris Lee Bergstrom';
    const feedDescription = channel.description || 'Entertainment industry and AI insights';
    
    // Ensure items is an array (could be a single item)
    const items = Array.isArray(channel.item) ? channel.item : (channel.item ? [channel.item] : []);
    
    // Transform the feed data to include only what we need (max 5 items)
    const posts = items.slice(0, 5).map((item: any) => {
      // Handle text content (including CDATA which is automatically parsed)
      const getTextContent = (field: any): string => {
        if (!field) return '';
        let content = '';
        if (typeof field === 'string') content = field;
        else if (typeof field === 'object' && field['#text']) content = field['#text'];
        else return '';
        
        // Decode HTML entities
        return content
          .replace(/&#8217;/g, "'")
          .replace(/&#8220;/g, '"')
          .replace(/&#8221;/g, '"')
          .replace(/&#8211;/g, '–')
          .replace(/&#8212;/g, '—')
          .replace(/&#8230;/g, '…')
          .replace(/&#8216;/g, "'")
          .replace(/&#8218;/g, '‚')
          .replace(/&#8222;/g, '„')
          .replace(/&#8226;/g, '•')
          .replace(/&#8482;/g, '™')
          .replace(/&#8594;/g, '→')
          .replace(/&#8592;/g, '←')
          .replace(/&#8593;/g, '↑')
          .replace(/&#8595;/g, '↓')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&nbsp;/g, ' ')
          .replace(/&#(\d+);/g, (match, num) => String.fromCharCode(parseInt(num, 10)))
          .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
      };
      
      const title = getTextContent(item.title);
      const link = getTextContent(item.link);
      const pubDate = getTextContent(item.pubDate);
      const author = getTextContent(item['dc:creator']) || 'Chris Lee Bergstrom';
      
      // Get content from content:encoded or description
      let fullContent = getTextContent(item['content:encoded']);
      if (!fullContent) {
        fullContent = getTextContent(item.description);
      }
      
      // Create content snippet (first 200 chars of text content)
      const textContent = fullContent.replace(/<[^>]*>/g, '').trim();
      const contentSnippet = textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;
      
      return {
        title,
        link,
        pubDate,
        contentSnippet,
        content: fullContent,
        author
      };
    });
    
    // Cache the data
    cachedData = {
      posts,
      feedTitle,
      feedDescription,
      timestamp: Date.now()
    };

    res.status(200).json({
      success: true,
      posts: posts,
      feedTitle: feedTitle,
      feedDescription: feedDescription
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