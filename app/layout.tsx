import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Analytics } from '@vercel/analytics/next';

export const revalidate = 0;

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnlineTools - Free Online Tools for Everyone',
  description: '25+ free online tools for developers, content creators, and more. JSON formatter, base64 encoder, QR code generator, word counter, and much more. 100% free, no login required.',
  keywords: 'online tools, free tools, json formatter, base64 encoder, url encoder, qr code, word counter',
  openGraph: {
    title: 'OnlineTools - Free Online Tools',
    description: '25+ free online tools. No login, no ads on tools, instant processing.',
    type: 'website',
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
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== 'ca-pub-0000000000000000' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
