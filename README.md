# Silverloft — website

Next.js (App Router) + Tailwind CSS. Plain JSX, no TypeScript.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/
  layout.jsx        Fonts (Archivo Black + Inter), global <head>
  page.jsx           Home page — composes all sections
  about/page.jsx      About page
  globals.css         Tailwind + focus states + reduced-motion rules

components/
  Navbar.jsx                 Fixed nav, Silverloft logo, Services / About, email + LinkedIn
  Hero.jsx                    Headline + character + Explore button
  RotatingWord.jsx            Cycles "Basic / Standard / Premium" every 3s
  CardCarouselBackground.jsx  3D rotating card ring behind the hero (grayscale → color on hover, pauses on hover)
  GlareText.jsx               Reusable hover/focus "light sweep" text effect
  Services.jsx                 #services section
  Work.jsx                     #work section — wraps ScrollStack with 3 sample case studies
  ScrollStack.jsx              Scroll-pinned stacking cards (Lenis-smoothed), from the component you supplied
  CaseStudyCard.jsx            Case study card content (phone mockup + copy + Live Demo button)
  LiveDemoButton.jsx           Animated CTA button
  Founders.jsx                 3 co-founder cards with placeholder avatars
  Footer.jsx                   Site footer

public/
  logo.png        Silverloft logo (from your upload)
  character.png    Hero character image (from your upload)
```

## Things you'll want to swap in

- **Case studies** (`components/Work.jsx`): the 3 cards in there right now
  (Wellness Companion / Kitchen Copilot / Flowboard) are placeholders so the
  scroll-stack effect has something to show. I didn't reuse the Aspect
  Health / Aida / Re:Call case studies from the reference site — those are a
  real designer's real client work with their own logos/trademarks, so
  copying them onto Silverloft's site would misrepresent whose work it is.
  Swap in your 3 real projects (title, tags, `theme`, and `href` — that's
  where the Vercel link goes for the Live Demo button).
- **Founders** (`components/Founders.jsx`): placeholder initials-avatars for
  the 3 of you — swap in real photos and names.
- **Email**: set to `silverloft111@gmail.com` (fixed the `.com` typo from
  your message — let me know if the address itself should be different).
- **LinkedIn URL**: currently a placeholder `linkedin.com` link in Navbar.jsx
  and Footer.jsx — drop in the real company page URL.

## Notes on a couple of build choices

- **Color palette**: kept it black / off-white / graphite, matching your
  Silverloft logo's silver-grey tone, instead of the reference site's pink
  accent — since the palette should say "Silverloft," not "the site I copied
  the layout from."
- **Character image**: used as a static image with a soft drop-shadow and
  the glare-hover labels underneath, exactly like the reference. If you
  actually want it as an interactive 3D model (you mentioned "isn't an
  image, it's a model") you'd need a `.glb`/`.gltf` 3D file — happy to wire
  that up with `@react-three/fiber` if you get one exported.
- **Reduced motion**: every animation (word rotator, card carousel, glare,
  scroll-stack) respects `prefers-reduced-motion`.
