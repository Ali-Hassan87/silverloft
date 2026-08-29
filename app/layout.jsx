import {
  Archivo_Black,
  Inter,
} from 'next/font/google';
import './globals.css';
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
  title: 'Silverloft — Websites, built to last',

  description:
    'Silverloft is a small studio of full-stack developers building fast, premium websites for founders and brands who care about the details.',

  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="overflow-x-hidden font-body antialiased ">
        {/* <AuraBackground/> */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}