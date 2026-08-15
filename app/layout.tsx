import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Analytics } from '@vercel/analytics/next';

export const revalidate = 0;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-code',
  display: 'swap',
});

export const metadata: Metadata = {
  // Child pages set a bare title; the template appends the brand.
  title: {
    default: 'OnlineTools — 24 utilities that run in your browser',
    template: '%s · OnlineTools',
  },
  description:
    'Formatters, encoders, converters and generators for everyday development work. Nothing uploads, nothing is stored, and there is no account to make.',
  keywords:
    'json formatter, base64 encoder, url encoder, regex tester, qr code generator, word counter, color converter, developer tools',
  openGraph: {
    title: 'OnlineTools — 24 utilities that run in your browser',
    description:
      'Formatters, encoders, converters and generators for everyday development work. Nothing uploads, nothing is stored.',
    type: 'website',
  },
};

// Applied before first paint so the correct theme is already on <html>.
const THEME_SCRIPT = `
try {
  var stored = localStorage.getItem('theme');
  var dark = stored ? stored === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) document.documentElement.classList.add('dark');
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const hasAdsense = adsenseId && adsenseId !== 'ca-pub-0000000000000000';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {hasAdsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          ></script>
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-canvas text-ink flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
