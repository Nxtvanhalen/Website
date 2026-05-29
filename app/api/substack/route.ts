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

// Substack puts post bodies in CDATA, so the XML parser leaves HTML entities
// (numeric, hex, and named) undecoded. Decode them in a single pass.
// fromCodePoint (not fromCharCode) is required so astral code points like
// emoji — anything above U+FFFF — decode correctly instead of garbling.
const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

function decodeEntities(input: string): string {
  return input.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, code) => {
    if (code[0] === '#') {
      const isHex = code[1] === 'x' || code[1] === 'X';
      const cp = isHex ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      if (!Number.isFinite(cp) || cp < 0 || cp > 0x10ffff) return match;
      try {
        return String.fromCodePoint(cp);
      } catch {
        return match;
      }
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}

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

        return decodeEntities(content);
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

      // Only the snippet is consumed by the UI; the full raw post HTML is
      // intentionally not returned (payload size + avoids shipping raw HTML).
      return {
        title,
        link,
        pubDate,
        contentSnippet,
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
