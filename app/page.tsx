import HomeClient from './HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Design for Small Businesses That Converts | PixlBuilder',
  description:
    'We design modern, conversion-focused websites for small businesses. Get a free homepage redesign — no obligation.',
  keywords: [
    'web design',
    'website redesign',
    'small business websites',
    'conversion focused web design',
  ],
  alternates: {
    canonical: 'https://pixlbuilder.com',
  },
  openGraph: {
    title: 'Web Design for Small Businesses That Converts | PixlBuilder',
    description:
      'We design modern, conversion-focused websites for small businesses. Get a free homepage redesign — no obligation.',
    type: 'website',
    url: 'https://pixlbuilder.com',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'PixlBuilder — Web design for small businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design for Small Businesses That Converts | PixlBuilder',
    description:
      'We design modern, conversion-focused websites for small businesses. Get a free homepage redesign — no obligation.',
    images: ['/og-image.svg'],
  },
};

export default function HomePage() {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PixlBuilder',
    url: 'https://pixlbuilder.com',
    description:
      'We design modern, conversion-focused websites for small businesses. Get a free homepage redesign — no obligation.',
    sameAs: [],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Web Design' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Website Redesign' },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <main>
        <HomeClient />
      </main>
    </>
  );
}
