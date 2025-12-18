import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono, Bree_Serif, Geo, Noto_Serif_Old_Uyghur } from 'next/font/google';
import Providers from './Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixlbuilder.com'),
  title: 'PixlBulilder – Innovative Web Solutions',
  description:
    'PixlBulilder is a full-service web development agency. We blend creativity and technology to build fast, accessible and visually striking websites.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Load variable fonts and expose them as CSS variables
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const breeSerif = Bree_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bree',
  display: 'swap',
});

const geo = Geo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geo',
  display: 'swap',
});

const notoOldUyghur = Noto_Serif_Old_Uyghur({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-noto-old-uyghur',
  display: 'swap',
  preload: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable} ${breeSerif.variable} ${geo.variable} ${notoOldUyghur.variable}`}
    >
      {/* Default to Inter; use font-display or font-mono in components as needed */}
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
