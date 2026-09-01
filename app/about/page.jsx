import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import AboutHero from '@/components/AboutHero';
import AboutManifesto from '@/components/AboutManifesto';

export const metadata = {
  title: 'About Our Studio & Full-Stack Developers',
  description:
    'Meet the full-stack engineering team behind Silverloft. We design, engineer, and ship bespoke web applications, interactive interfaces, and scalable SaaS solutions.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Our Studio & Full-Stack Developers — Silverloft',
    description:
      'Meet the full-stack engineering team behind Silverloft. We design, engineer, and ship bespoke web applications, interactive interfaces, and scalable SaaS solutions.',
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