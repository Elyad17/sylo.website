import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

export const metadata: Metadata = {
  title: 'PixlBulilder – Innovative Web Solutions',
  description:
    'PixlBulilder is a full-service web development agency. We blend creativity and technology to build fast, accessible and visually striking websites.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
    >
      {/* Default to Inter; use font-display or font-mono in components as needed */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
