import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/ui/Toast';

import { generateOrganizationSchema } from '@/lib/seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bricksbazar.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'BricksBazar — India’s Premier Real Estate & Construction Marketplace',
    template: '%s | BricksBazar',
  },
  description:
    'Discover verified properties, luxury villas, apartments, plots, new projects, trusted agents, and construction materials across Mumbai, Pune, Bengaluru, Hyderabad, and Delhi NCR.',
  keywords: [
    'real estate India',
    'buy flats Mumbai',
    'luxury villas Pune',
    'construction materials online',
    'cement steel suppliers',
    'new projects RERA',
    'verified real estate agents',
  ],
  authors: [{ name: 'BricksBazar Technologies' }],
  creator: 'BricksBazar',
  publisher: 'BricksBazar Technologies Pvt Ltd',
  icons: {
    icon: '/brand/logo.png',
    apple: '/brand/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'BricksBazar — India’s Premier Real Estate & Construction Marketplace',
    description:
      'Discover verified properties, luxury villas, apartments, plots, and construction materials across top Indian metros.',
    siteName: 'BricksBazar',
    images: [
      {
        url: `${SITE_URL}/brand/logo.png`,
        width: 1254,
        height: 1254,
        alt: 'BricksBazar Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BricksBazar — India’s Premier Real Estate & Construction Marketplace',
    description:
      'Discover verified properties, new projects, and construction materials across top Indian metros.',
    images: [`${SITE_URL}/brand/logo.png`],
    creator: '@bricksbazar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-brand-text min-h-screen flex flex-col selection:bg-brand-red selection:text-white">
        <ToastProvider>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
