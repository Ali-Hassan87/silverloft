import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import AboutHero from '@/components/AboutHero';
import AboutManifesto from '@/components/AboutManifesto';

export const metadata = {
  title: 'About',
  description:
    'Silverloft is a three-person studio that designs, builds, and ships full-stack products end to end.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Silverloft',
    description:
      'Silverloft is a three-person studio that designs, builds, and ships full-stack products end to end.',
    url: 'https://silverloft.me/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pt-32 pb-10">
        <AboutHero />
        <AboutManifesto />
        <Founders />
      </main>
      <Footer />
    </>
  );
}