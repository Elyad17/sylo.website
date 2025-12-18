import ClosingPage from '@/components/ClosingPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClosingPageRoute() {
  return <ClosingPage />;
}
