import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Silverloft. Learn how we handle your data and respect your digital privacy.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — Silverloft',
    description:
      'Privacy Policy for Silverloft. Learn how we handle your data and respect your digital privacy.',
    url: 'https://silverloft.me/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-paper pt-36 pb-24 sm:pt-44 sm:pb-32">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-ink/[0.025] blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 sm:px-10">
          {/* Header */}
          <div className="border-b border-ink/10 pb-10 sm:pb-14">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-ink/20" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                Legal & Compliance
              </span>
            </div>
            <h1 className="font-display text-4xl tracking-tight text-ink sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xs tracking-widest text-ink/40 uppercase">
              Last updated: September 1, 2026
            </p>
          </div>

          {/* Content sections */}
          <div className="mt-12 space-y-12 text-sm leading-relaxed text-ink/70 sm:text-base">
            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                1. Overview
              </h2>
              <p className="mt-3">
                Silverloft (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website at{' '}
                <Link href="/" className="font-medium text-ink underline underline-offset-4">
                  silverloft.me
                </Link>{' '}
                or communicate with our team.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                2. Information We Collect
              </h2>
              <p className="mt-3">
                We believe in minimal data collection. We do not require account registration or store sensitive personal information on this website:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-ink">Direct Communications:</strong> When you email us directly at{' '}
                  <a href="mailto:contact@silverloft.me" className="font-medium text-ink underline underline-offset-4">
                    contact@silverloft.me
                  </a>
                  , we collect your email address, name, and any details you provide in your message to respond to your inquiry.
                </li>
                <li>
                  <strong className="text-ink">Technical & Analytics Data:</strong> Anonymous telemetry (such as browser type, device type, referring URLs, and approximate geographic region) may be collected to monitor site performance and accessibility.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                3. How We Use Information
              </h2>
              <p className="mt-3">We use the information collected solely to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Respond to inquiries, project proposals, and consultation requests.</li>
                <li>Maintain, monitor, and optimize the security and performance of our website.</li>
                <li>Comply with applicable legal and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                4. Cookies and Tracking
              </h2>
              <p className="mt-3">
                We do not use invasive tracking cookies or sell your personal data to third parties. Any analytics tools deployed on our website operate in privacy-respecting configurations.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                5. Third-Party Services
              </h2>
              <p className="mt-3">
                Our website links to live client demos and external platforms (such as GitHub, LinkedIn, Instagram, and Vercel). We are not responsible for the privacy practices or content of third-party platforms.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                6. Contact & Data Inquiries
              </h2>
              <p className="mt-3">
                If you have questions regarding this policy or wish to request the deletion of your email correspondence, please contact us at:
              </p>
              <div className="mt-4 rounded-xl border border-ink/10 bg-ink/[0.02] p-5">
                <p className="font-medium text-ink">Silverloft Digital Studio</p>
                <p className="mt-1">
                  Email:{' '}
                  <a href="mailto:contact@silverloft.me" className="font-medium text-ink underline underline-offset-4">
                    contact@silverloft.me
                  </a>
                </p>
                <p>Website: https://silverloft.me</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
