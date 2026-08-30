import Image from 'next/image';
import Link from 'next/link';

const SOCIALS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/silver-loft-1a3334428/',
    path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Silver-Loft',
    path: 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.13-4.56-5.03 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.91-2.34 4.77-4.57 5.02.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/silverloftofficial/',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    name: 'Email',
    href: 'mailto:contact@silverloft.me',
    path: 'M12 13.06 2.4 6.5A2 2 0 0 1 4 5h16a2 2 0 0 1 1.6 1.5L12 13.06Zm10-4.72V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.34l9.4 6.51a1 1 0 0 0 1.2 0L22 8.34Z',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61593831064805',
    path: 'M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6h1.7V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V10H7.7v3h2.7v8h3.1Z'
  },
];

const FOOTER_LINKS = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-ink text-paper">

      {/* Top gradient line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-paper/40 to-transparent" />

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-paper/[0.035] blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[350px] w-[350px] rounded-full bg-paper/[0.025] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">

        {/* Main footer */}
        <div className="grid gap-14 py-16 md:grid-cols-[1.4fr_0.7fr_1fr] md:gap-16 md:py-20">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.04]">
                <Image
                  src="/logo.png"
                  alt="Silverloft logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain invert"
                />
              </div>

              <div>
                <p className="font-display text-xl tracking-tight">
                  Silverloft
                </p>

                <p className="text-[10px] uppercase tracking-[0.2em] text-paper/35">
                  Digital Studio
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-paper/50 md:text-base">
              We design and build websites that feel handcrafted — from the
              first sketch to production.
            </p>

            {/* Large brand word */}
            <div className="mt-16 overflow-hidden">
              <p className="select-none whitespace-nowrap text-[15vw] font-semibold leading-[0.7] tracking-[-0.08em] text-paper/[0.045] transition-all duration-700 hover:text-paper/[0.08] md:text-[9vw]">
                SILVERLOFT
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer"
            className="flex flex-col gap-4"
          >
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/30">
              Explore
            </p>

            {FOOTER_LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex w-fit items-center gap-3 text-sm text-paper/65 transition-all duration-300 hover:translate-x-1 hover:text-paper"
              >
                <span className="text-[10px] text-paper/20 transition-colors duration-300 group-hover:text-paper/60">
                  0{index + 1}
                </span>

                <span className="relative">
                  {link.label}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-paper transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          {/* Contact + Social */}
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/30">
              Start a project
            </p>

            <a
              href="mailto:contact@silverloft.me"
              className="group relative w-fit text-lg font-medium tracking-tight text-paper/80 transition-colors duration-300 hover:text-paper md:text-xl"
            >
              contact@silverloft.me

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-paper transition-all duration-500 group-hover:w-full" />
            </a>

            <p className="mt-6 max-w-xs text-xs leading-6 text-paper/35">
              Have an idea, a product, or a website that needs to exist?
              Let&apos;s turn it into something people remember.
            </p>

            {/* SVG Social Icons */}
            <div className="mt-8 flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Silverloft on ${social.name}`}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-paper/15 text-paper/55 transition-all duration-300 hover:-translate-y-1 hover:border-paper/40"
                >
                  {/* Hover circle */}
                  <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-300 ease-out group-hover:translate-y-0" />

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-ink"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.035] px-6 py-8 md:px-10 md:py-10">

          <div className="pointer-events-none absolute -right-20 -top-32 h-64 w-64 rounded-full bg-paper/[0.05] blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/30">
                Silverloft / 2026
              </p>

              <h3 className="mt-2 max-w-xl text-2xl font-medium tracking-tight text-paper/90 md:text-3xl">
                Good ideas deserve a great digital home.
              </h3>
            </div>

            <a
              href="mailto:contact@silverloft.me"
              className="group flex w-fit items-center gap-3 rounded-full border border-paper/20 px-5 py-3 text-xs font-medium text-paper/75 transition-all duration-300 hover:border-paper/50 hover:bg-paper hover:text-ink"
            >
              Start a conversation

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-paper/10">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-center gap-4 px-6 py-8 text-center md:px-10">

          <p className="text-[10px] tracking-wide text-paper/30 md:text-xs">
            © {new Date().getFullYear()} Silverloft. Built by the people who built it.
          </p>

          <p className="text-[10px] tracking-wide text-paper/25 md:text-xs">
            <span className="bg-gradient-to-r from-paper via-paper/60 to-paper bg-[length:200%_auto] bg-clip-text font-medium text-transparent transition-[background-position] duration-700 hover:bg-[position:right_center]">
              SilverLoft Expert, Designed By Ali Hassan
            </span>
          </p>

        </div>
      </div>
    </footer>
  );
}