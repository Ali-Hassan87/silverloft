'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/#services', label: 'Services', key: 'services' },
  { href: '/about', label: 'About', key: 'about' },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const linkRefs = useRef({});
  const listRef = useRef(null);
  const mobileNavRef = useRef(null);

  /*
   * Active route
   */
  const isActive = useCallback(
    (href) => {
      if (href === '/about') {
        return pathname === '/about';
      }

      return pathname === '/';
    },
    [pathname]
  );

  const activeKey = NAV_LINKS.find((link) =>
    isActive(link.href)
  )?.key;

  /*
   * Scroll state
   *
   * Important:
   * Navbar NEVER hides while scrolling.
   * We only change the visual glass state.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /*
   * Active navigation indicator
   */
  const measureIndicator = useCallback(() => {
    if (!activeKey) {
      setIndicator((prev) => ({
        ...prev,
        opacity: 0,
      }));
      return;
    }

    const link = linkRefs.current[activeKey];
    const list = listRef.current;

    if (!link || !list) return;

    const linkRect = link.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    setIndicator({
      left: linkRect.left - listRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [activeKey]);

  /*
   * Indicator resize
   */
  useEffect(() => {
    const frame = window.requestAnimationFrame(
      measureIndicator
    );

    window.addEventListener('resize', measureIndicator);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(
        'resize',
        measureIndicator
      );
    };
  }, [measureIndicator]);

  /*
   * Re-measure after navbar visual state changes
   */
  useEffect(() => {
    const frame = window.requestAnimationFrame(
      measureIndicator
    );

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [scrolled, measureIndicator]);

  /*
   * Close mobile menu after route change
   */
  useEffect(() => {
    // If focus is still inside the mobile nav (e.g. the link that was
    // just clicked to navigate), move it out BEFORE aria-hidden gets
    // applied below — otherwise the browser blocks it because a
    // hidden ancestor can't contain a focused descendant.
    const activeEl = document.activeElement;

    if (
      mobileNavRef.current &&
      activeEl &&
      mobileNavRef.current.contains(activeEl)
    ) {
      activeEl.blur();
    }

    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  /*
   * Escape key
   */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [menuOpen]);

  /*
   * Magnetic nav effect
   */
  const handleMagneticMove = (event, key) => {
    if (window.matchMedia('(hover: none)').matches) {
      return;
    }

    const element = linkRefs.current[key];

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    element.style.transform = `translate(${x * 0.08}px, ${y * 0.08
      }px)`;
  };

  const handleMagneticLeave = (key) => {
    const element = linkRefs.current[key];

    if (!element) return;

    element.style.transform = 'translate(0, 0)';
    setHoveredKey(null);
  };

  const handleMobileLinkClick = (event) => {
    event.currentTarget.blur();
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 translate-y-0 px-2.5 transition-none sm:px-3 md:px-4 lg:px-5">
      <div
        className={`mx-auto transition-all duration-500 ${scrolled
          ? 'mt-3 max-w-[1340px]'
          : 'mt-2 max-w-[1520px] sm:mt-3'
          }`}
      >
        <nav
          aria-label="Primary"
          className={`relative flex min-h-[62px] items-center justify-between rounded-[18px] px-3 transition-all duration-500 sm:min-h-[68px] sm:rounded-[20px] sm:px-4 md:min-h-[72px] md:px-5 lg:px-6 ${scrolled
            ? 'border border-black/[0.07] bg-white/[0.45] shadow-[0_18px_55px_rgba(0,0,0,0.09)] backdrop-blur-2xl'
            : 'border border-black/[0.045] bg-white/[0.58] shadow-[0_8px_35px_rgba(0,0,0,0.025)] backdrop-blur-xl'
            }`}
        >
          {/* Soft top highlight */}
          <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent sm:inset-x-7 md:inset-x-9" />

          {/* Subtle inner glow */}
          <div
            className="
              pointer-events-none absolute
              inset-0 rounded-[inherit]
              ring-1 ring-inset ring-white/40
            "
          />

          {/* Logo */}
          <Link
            href="/"
            aria-label="Silverloft home"
            className="
              group relative z-10
              flex shrink-0
              items-center gap-2
              sm:gap-3
              md:gap-3.5
            "
          >
            <span
              className="
                pointer-events-none absolute
                -inset-3 rounded-2xl
                bg-black/[0.055]
                opacity-0 blur-xl
                transition-all duration-700
                group-hover:opacity-100
              "
            />

            <span
              className="
                relative flex
                h-8 w-8
                items-center justify-center
                sm:h-9 sm:w-9
                md:h-10 md:w-10
              "
            >
              <Image
                src="/logo.png"
                alt="Silverloft"
                width={80}
                height={80}
                priority
                className="
                  h-7 w-7
                  object-contain
                  scale-[1.12]
                  transition-transform duration-500
                  group-hover:scale-[1.22]
                  sm:h-8 sm:w-8
                  md:h-9 md:w-9
                "
              />
            </span>

            <span className="flex min-w-0 flex-col">
              <span
                className="
                  whitespace-nowrap
                  text-[11px]
                  font-semibold
                  tracking-[0.17em]
                  text-black
                  transition-all duration-300
                  group-hover:tracking-[0.21em]
                  sm:text-[13px]
                  sm:tracking-[0.2em]
                  md:text-[15px]
                  md:tracking-[0.24em]
                  md:group-hover:tracking-[0.28em]
                "
              >
                SILVERLOFT
              </span>

              <span
                className="
                  mt-0.5 hidden
                  text-[7px]
                  font-medium
                  uppercase
                  tracking-[0.34em]
                  text-black/35
                  sm:block
                  md:text-[8px]
                "
              >
                Digital Studio
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul
            ref={listRef}
            className="
              absolute left-1/2
              hidden -translate-x-1/2
              items-center gap-1
              rounded-full
              border border-black/[0.055]
              bg-black/[0.025]
              p-1
              md:flex
            "
          >
            {/* Active pill */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-y-1
                rounded-full
                bg-black
                shadow-[0_4px_14px_rgba(0,0,0,0.18)]
                transition-all duration-500
                ease-[cubic-bezier(0.23,1,0.32,1)]
              "
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />

            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);

              return (
                <li
                  key={link.key}
                  className="relative z-10"
                >
                  <Link
                    ref={(element) => {
                      linkRefs.current[link.key] =
                        element;
                    }}
                    href={link.href}
                    onClick={() => {
                      if (link.href === '/#services') {
                        setTimeout(() => {
                          document.getElementById('services')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }, 50);
                      }
                    }}
                    onMouseMove={(event) =>
                      handleMagneticMove(
                        event,
                        link.key
                      )
                    }
                    onMouseEnter={() =>
                      setHoveredKey(link.key)
                    }
                    onMouseLeave={() =>
                      handleMagneticLeave(link.key)
                    }
                    className={`
                      relative flex
                      min-w-[94px]
                      items-center
                      justify-center
                      rounded-full
                      px-4 py-2.5
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      outline-none
                      transition-[color,background-color,transform]
                      duration-300
                      ease-out
                      lg:min-w-[105px]
                      lg:px-5
                      lg:text-[11px]
                      lg:tracking-[0.2em]
                      focus-visible:ring-2
                      focus-visible:ring-black/20
                      ${active
                        ? 'text-white'
                        : 'text-black/45 hover:text-black'
                      }
                    `}
                  >
                    {link.label}

                    <span
                      className={`
                        absolute
                        bottom-[5px]
                        left-1/2
                        h-[2px]
                        rounded-full
                        bg-current
                        transition-all
                        duration-300
                        ${hoveredKey === link.key &&
                          !active
                          ? 'w-3 -translate-x-1/2 opacity-100'
                          : 'w-0 -translate-x-1/2 opacity-0'
                        }
                      `}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div
            className="
              relative z-10
              flex items-center
              gap-1.5
              sm:gap-2
              md:gap-2.5
            "
          >
            {/* Availability */}
            <a
              href="mailto:silverloft111@gmail.com"
              className="
                group hidden
                items-center gap-2.5
                rounded-full
                border border-black/[0.07]
                bg-white/60
                px-4 py-2.5
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-black/15
                hover:bg-white
                hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                lg:flex
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inset-0
                    animate-ping
                    rounded-full
                    bg-[#22c55e]
                    opacity-30
                  "
                />

                <span
                  className="
                    relative h-2 w-2
                    rounded-full
                    bg-[#22c55e]
                    shadow-[0_0_7px_rgba(34,197,0,0.55)]
                  "
                />
              </span>

              <span
                className="
                  text-[10px]
                  font-medium
                  tracking-[0.08em]
                  text-black/45
                  transition-colors
                  group-hover:text-black/75
                "
              >
                silverloft111@gmail.com
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/silver-loft-1a3334428/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Silverloft on LinkedIn"
              className="
                hidden h-9 w-9
                items-center justify-center
                rounded-full
                border border-black/[0.08]
                bg-white/50
                text-black/45
                outline-none
                transition-all duration-300
                hover:-translate-y-1
                hover:border-black/15
                hover:bg-black
                hover:text-white
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]
                focus-visible:ring-2
                focus-visible:ring-black/20
                sm:flex
                md:h-10 md:w-10
              "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61593831064805"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Silverloft on Facebook"
              className="
                  hidden h-9 w-9
                  items-center justify-center
                  rounded-full
                 border border-black/[0.08]
                 bg-white/50
                 text-black/45
                  outline-none
                  transition-all duration-300
                  hover:-translate-y-1
                 hover:border-black/15
                 hover:bg-black
                 hover:text-white
                  hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]
                  focus-visible:ring-2
                 focus-visible:ring-black/20
                  sm:flex
                  md:h-10 md:w-10 "
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.55.45-1 1-1Z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Silverloft on Telegram"
              className="
                group hidden h-9 w-9
                items-center justify-center
                rounded-full
                border border-black/[0.08]
                bg-white/50
                text-black/45
                outline-none
                transition-all duration-300
                hover:-translate-y-1
                hover:border-black
                hover:bg-black
                hover:text-white
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.14)]
                focus-visible:ring-2
                focus-visible:ring-black/20
                sm:flex
                md:h-10 md:w-10
              "
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="
                  transition-transform duration-300
                  group-hover:rotate-[-8deg]
                  group-hover:scale-110
                "
              >
                <path
                  d="M21.7 3.4 18.5 20c-.24 1.17-.87 1.46-1.77.91l-4.87-3.59-2.35 2.26c-.26.26-.48.48-.99.48l.35-4.96 9.02-8.15c.39-.35-.09-.55-.6-.2L6.14 13.7 1.37 12.21c-1.04-.33-1.06-1.04.22-1.54L20.22 3.3c.88-.32 1.65.2 1.48.1Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() =>
                setMenuOpen((value) => !value)
              }
              aria-label={
                menuOpen
                  ? 'Close menu'
                  : 'Open menu'
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="
                relative flex h-9 w-9
                shrink-0
                items-center justify-center
                rounded-full
                border border-black/[0.08]
                bg-white/60
                text-black
                outline-none
                transition-all duration-300
                hover:border-black/20
                hover:bg-black
                hover:text-white
                focus-visible:ring-2
                focus-visible:ring-black/20
                md:hidden
                sm:h-10 sm:w-10
              "
            >
              <span
                className="
                  relative block h-3.5 w-4
                "
              >
                <span
                  className={`
                    absolute left-0 top-0
                    h-px w-full
                    rounded-full
                    bg-current
                    transition-all duration-300
                    ${menuOpen
                      ? 'top-1/2 rotate-45'
                      : ''
                    }
                  `}
                />

                <span
                  className={`
                    absolute left-0 top-1/2
                    h-px w-full
                    -translate-y-1/2
                    rounded-full
                    bg-current
                    transition-all duration-300
                    ${menuOpen
                      ? 'scale-x-0 opacity-0'
                      : ''
                    }
                  `}
                />

                <span
                  className={`
                    absolute bottom-0 left-0
                    h-px w-full
                    rounded-full
                    bg-current
                    transition-all duration-300
                    ${menuOpen
                      ? 'bottom-1/2 -rotate-45'
                      : ''
                    }
                  `}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-navigation"
          ref={mobileNavRef}
          aria-hidden={!menuOpen}
          className={`
            mt-2 overflow-hidden
            rounded-[20px]
            border border-black/[0.07]
            bg-white/[0.93]
            shadow-[0_18px_50px_rgba(0,0,0,0.08)]
            backdrop-blur-2xl
            transition-all duration-500
            md:hidden
            ${menuOpen
              ? 'max-h-[520px] opacity-100'
              : `
                  pointer-events-none
                  max-h-0
                  border-transparent
                  opacity-0
                `
            }
          `}
        >
          <div className="p-2.5 sm:p-3">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={handleMobileLinkClick}
                  tabIndex={menuOpen ? 0 : -1}
                  className={`
                    group flex items-center
                    justify-between
                    rounded-[14px]
                    px-4 py-3.5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    outline-none
                    transition-all duration-300
                    sm:py-4
                    focus-visible:ring-2
                    focus-visible:ring-black/20
                    ${active
                      ? 'bg-black text-white'
                      : `
                          text-black/45
                          hover:bg-black/[0.04]
                          hover:text-black
                        `
                    }
                    ${menuOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-3 opacity-0'
                    }
                  `}
                  style={{
                    transitionDelay: menuOpen
                      ? `${index * 70}ms`
                      : '0ms',
                  }}
                >
                  <span>{link.label}</span>

                  <span
                    className={`
                      h-1.5 w-1.5
                      rounded-full
                      transition-all duration-300
                      ${active
                        ? 'bg-white'
                        : 'bg-black/10 group-hover:bg-black/40'
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>

          <div
            className="
              flex flex-col gap-3
              border-t border-black/[0.06]
              px-4 py-4
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-5
            "
          >
            <a
              href="mailto:silverloft111@gmail.com"
              className="
                min-w-0 truncate
                text-[10px]
                font-medium
                tracking-wide
                text-black/40
                transition-colors
                hover:text-black
              "
            >
              silverloft111@gmail.com
            </a>

            <div className="flex items-center gap-2">
              {/* LinkedIn mobile */}
              <a
                href="https://www.linkedin.com/in/silver-loft-1a3334428/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-black/[0.08]
                  text-black/40
                  transition-all
                  hover:bg-black
                  hover:text-white
                "
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.47-2.2 3v5.8h-4V9Z" />
                </svg>
              </a>

              {/* Facebook mobile */}
              <a
                href="https://www.facebook.com/profile.php?id=61593831064805"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-black/[0.08]
                  text-black/40
                  transition-all
                  hover:bg-black
                  hover:text-white "
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.55.45-1 1-1Z" />
                </svg>
              </a>

              {/* Telegram mobile */}
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="
                  group flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  border border-black/[0.08]
                  text-black/40
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-black
                  hover:text-white
                "
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="
                    transition-transform duration-300
                    group-hover:rotate-[-8deg]
                  "
                >
                  <path
                    d="M21.7 3.4 18.5 20c-.24 1.17-.87 1.46-1.77.91l-4.87-3.59-2.35 2.26c-.26.26-.48.48-.99.48l.35-4.96 9.02-8.15c.39-.35-.09-.55-.6-.2L6.14 13.7 1.37 12.21c-1.04-.33-1.06-1.04.22-1.54L20.22 3.3c.88-.32 1.65.2 1.48.1Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}