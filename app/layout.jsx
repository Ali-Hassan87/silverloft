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
    default: 'Silverloft — High-Performance Web Development Studio',
    template: '%s | Silverloft Studio',
  },
  description:
    'Silverloft is a boutique digital studio of full-stack developers crafting high-performance custom web applications, SaaS platforms, and bespoke digital experiences for founders and growing brands.',
  keywords: [
    'Silverloft',
    'web development studio',
    'custom web development',
    'full-stack developers',
    'Next.js development agency',
    'React web applications',
    'Tailwind CSS development',
    'high performance websites',
    'SaaS development studio',
    'frontend engineering',
    'backend infrastructure',
    'custom UI UX web design',
    'e-commerce web development',
    'web app development company',
    'modern digital studio',
    'Ali Hassan full-stack',
    'Muhammad Hashir backend',
    'Hafiz Faizan product engineer',
    'web speed optimization',
    'SEO optimized web development',
  ],
  authors: [
    { name: 'Ali Hassan', url: 'https://github.com/Ali-Hassan87' },
    { name: 'Muhammad Hashir', url: 'https://github.com/Muhammad-Hashir-786' },
    { name: 'Hafiz Faizan', url: 'https://github.com/fazy777' },
  ],
  creator: 'Silverloft',
  publisher: 'Silverloft',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Silverloft — High-Performance Web Development Studio',
    description:
      'Boutique digital studio crafting high-performance custom web applications, SaaS platforms, and modern websites with Next.js and Tailwind CSS.',
    url: 'https://silverloft.me',
    siteName: 'Silverloft',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 800,
        alt: 'Silverloft Digital Studio Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silverloft — High-Performance Web Development Studio',
    description:
      'Boutique digital studio crafting high-performance custom web applications, SaaS platforms, and modern websites with Next.js and Tailwind CSS.',
    images: ['/logo.png'],
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://silverloft.me/#organization',
      name: 'Silverloft',
      url: 'https://silverloft.me',
      logo: {
        '@type': 'ImageObject',
        url: 'https://silverloft.me/logo.png',
        width: '800',
        height: '800',
      },
      image: 'https://silverloft.me/logo.png',
      description:
        'Silverloft is a boutique digital studio of full-stack developers crafting high-performance custom web applications, SaaS platforms, and bespoke digital experiences.',
      email: 'contact@silverloft.me',
      sameAs: [
        'https://github.com/Silver-Loft',
        'https://www.linkedin.com/in/silver-loft-1a3334428/',
        'https://www.instagram.com/silverloftofficial/',
        'https://www.facebook.com/profile.php?id=61593831064805',
      ],
      founder: [
        {
          '@type': 'Person',
          name: 'Ali Hassan',
          jobTitle: 'Co-Founder & Full-Stack Developer',
          sameAs: 'https://github.com/Ali-Hassan87',
        },
        {
          '@type': 'Person',
          name: 'Muhammad Hashir',
          jobTitle: 'Co-Founder & Full-Stack Developer',
          sameAs: 'https://github.com/Muhammad-Hashir-786',
        },
        {
          '@type': 'Person',
          name: 'Hafiz Faizan',
          jobTitle: 'Co-Founder & Full-Stack Developer',
          sameAs: 'https://github.com/fazy777',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://silverloft.me/#website',
      url: 'https://silverloft.me',
      name: 'Silverloft',
      publisher: {
        '@id': 'https://silverloft.me/#organization',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="overflow-x-hidden font-body antialiased bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}