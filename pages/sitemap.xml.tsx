import { GetServerSideProps } from 'next';

function generateSiteMap() {
  const baseUrl = 'https://chrisleebergstrom.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    {
      url: '',
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: '/home',
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/about',
      changefreq: 'monthly', 
      priority: '0.8'
    },
    {
      url: '/projects',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: '/blog',
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/news',
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      url: '/faq',
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: '/privacy',
      changefreq: 'yearly',
      priority: '0.3'
    }
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
  .map(({ url, changefreq, priority }) => {
    return `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Generate the XML sitemap
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // Cache for 24 hours
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;