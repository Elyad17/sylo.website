import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/closing-page', '/thank-you'],
      },
    ],
    sitemap: 'https://pixlbuilder.com/sitemap.xml',
    host: 'https://pixlbuilder.com',
  };
}
