import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Silverloft. Review the terms governing your use of our digital studio website.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service — Silverloft',
    description:
      'Terms of Service for Silverloft. Review the terms governing your use of our digital studio website.',
    url: 'https://silverloft.me/terms',
  },
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="mt-4 text-xs tracking-widest text-ink/40 uppercase">
              Last updated: September 1, 2026
            </p>
          </div>

          {/* Content sections */}
          <div className="mt-12 space-y-12 text-sm leading-relaxed text-ink/70 sm:text-base">
            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3">
                By accessing or using the Silverloft website (
                <Link href="/" className="font-medium text-ink underline underline-offset-4">
                  silverloft.me
                </Link>
                ), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                2. Studio Services & Engagement
              </h2>
              <p className="mt-3">
                Silverloft is a boutique digital engineering studio providing custom web development, UI design, and full-stack software architecture. All client engagements, project scopes, payment schedules, and deliverable warranties are executed under formal, separate client agreements and statements of work (SOW).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                3. Intellectual Property Rights
              </h2>
              <p className="mt-3">
                All original branding, designs, code architecture, text, and visual assets on this site are the intellectual property of Silverloft unless otherwise noted. Project trademarks, third-party logos, and client case study assets belong to their respective owners.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                4. External Links & Demonstrations
              </h2>
              <p className="mt-3">
                Our portfolio contains links to live web applications and external domains. While we take pride in the software we craft, we are not liable for any third-party content, hosting availability, or data practices on external domains.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                5. Limitation of Liability
              </h2>
              <p className="mt-3">
                This website and its contents are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. In no event will Silverloft be liable for any indirect, incidental, or consequential damages resulting from the use of this website.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
                6. Contact Information
              </h2>
              <p className="mt-3">
                For legal inquiries or questions regarding our terms, please email us at:
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
