import {
  Archivo_Black,
  Inter,
} from 'next/font/google';
import './globals.css';
import Analytics from '@/components/Analytics';
// import AuraBackground from '@/components/AuraBackground';


const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  metadataBase: new URL('https://silverloft.me'),
  title: {
    default: 'Silverloft — Websites, built to last',
    template: '%s | Silverloft',
  },
  description:
    'Silverloft is a small studio of full-stack developers building fast, premium websites for founders and brands who care about the details.',
  keywords: [
    'Silverloft',
    'web development studio',
    'full-stack developers',
    'custom web applications',
    'Next.js development',
    'Tailwind CSS',
    'high performance websites',
    'digital agency',
  ],
  authors: [
    { name: 'Ali Hassan' },
    { name: 'Muhammad Hashir' },
    { name: 'Hafiz Faizan' },
  ],
  creator: 'Silverloft',
  publisher: 'Silverloft',
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Silverloft — Websites, built to last',
    description:
      'Silverloft is a small studio of full-stack developers building fast, premium websites for founders and brands who care about the details.',
    url: 'https://silverloft.me',
    siteName: 'Silverloft',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Silverloft Digital Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silverloft — Websites, built to last',
    description:
      'Silverloft is a small studio of full-stack developers building fast, premium websites for founders and brands who care about the details.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="overflow-x-hidden font-body antialiased bg-paper text-ink">
        <Analytics />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}