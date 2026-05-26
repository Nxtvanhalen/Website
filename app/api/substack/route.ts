import { XMLParser } from 'fast-xml-parser';
import { NextResponse } from 'next/server';

let cachedData: {
  posts: any[];
  feedTitle: string;
  feedDescription: string;
  timestamp: number;
} | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

const cacheHeaders = { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' };

export async function GET() {
  try {
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return NextResponse.json(
        {
          success: true,
          posts: cachedData.posts,
          feedTitle: cachedData.feedTitle,
          feedDescription: cachedData.feedDescription,
          cached: true,
        },
        { status: 200, headers: cacheHeaders },
      );
    }

    const substackFeedUrl = 'https://chrisleebergstrom.substack.com/feed';
    const response = await fetch(substackFeedUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feedData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: true,
      trimValues: true,
      parseAttributeValue: true,
      processEntities: true,
      htmlEntities: true,
    });

    const parsedData = parser.parse(feedData);
    const channel = parsedData?.rss?.channel;

    if (!channel) {
      throw new Error('Invalid RSS feed structure');
    }

    const feedTitle = channel.title || 'Chris Lee Bergstrom';
    const feedDescription = channel.description || 'Entertainment industry and AI insights';

    const items = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

    const posts = items.slice(0, 5).map((item: any) => {
      const getTextContent = (field: any): string => {
        if (!field) return '';
        let content = '';
        if (typeof field === 'string') content = field;
        else if (typeof field === 'object' && field['#text']) content = field['#text'];
        else return '';

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
          .replace(/&#(\d+);/g, (_match, num) => String.fromCharCode(parseInt(num, 10)))
          .replace(/&#x([0-9a-fA-F]+);/g, (_match, hex) => String.fromCharCode(parseInt(hex, 16)));
      };

      const title = getTextContent(item.title);
      const link = getTextContent(item.link);
      const pubDate = getTextContent(item.pubDate);
      const author = getTextContent(item['dc:creator']) || 'Chris Lee Bergstrom';

      let fullContent = getTextContent(item['content:encoded']);
      if (!fullContent) {
        fullContent = getTextContent(item.description);
      }

      const textContent = fullContent.replace(/<[^>]*>/g, '').trim();
      const contentSnippet =
        textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;

      return {
        title,
        link,
        pubDate,
        contentSnippet,
        content: fullContent,
        author,
      };
    });

    cachedData = {
      posts,
      feedTitle,
      feedDescription,
      timestamp: Date.now(),
    };

    return NextResponse.json(
      {
        success: true,
        posts,
        feedTitle,
        feedDescription,
      },
      { status: 200, headers: cacheHeaders },
    );
  } catch (error) {
    console.error('Error fetching Substack feed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Substack feed',
        posts: [],
      },
      { status: 500, headers: cacheHeaders },
    );
  }
}
