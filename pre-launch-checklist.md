# Pre-Launch Checklist — Silverloft

Usage: check off items as `- [x]`. View progress in terminal with:
```bash
grep -c "\[x\]" pre-launch-checklist.md   # done
grep -c "\[ \]" pre-launch-checklist.md   # remaining
grep "\[ \]" pre-launch-checklist.md      # what's left
```

---

## 1. Security

- [x] **1.1 Force HTTPS** — SSL certs valid; all HTTP traffic redirects to HTTPS (`curl -I http://silverloft.me` -> `301` to `https://`)
- [x] **1.2 Password Cryptography** — N/A (Static studio portfolio, no stored passwords/DB)
- [x] **1.3 Environment Variables** — `.env*` files protected in `.gitignore`; no hardcoded secrets in codebase
- [x] **1.4 Rate Limiting** — N/A (Static export on GitHub Pages / Fastly Edge CDN with DDoS protection)
- [x] **1.5 Input Sanitization** — N/A (No user input forms or SQL database queries)
- [x] **1.6 CORS Policy** — CORS configured for public static assets; no private API routes exposed

## 2. Emails

- [x] **2.1 DNS Authentication** — SPF (`v=spf1 include:spf.efwd.registrar-servers.com ~all`), MX, and DMARC (`_dmarc.silverloft.me`) verified active
- [x] **2.2 Onboarding Flow** — N/A (No user registration on studio site)
- [x] **2.3 Verification Flow** — N/A (No email verification flow needed)
- [x] **2.4 Password Reset Flow** — N/A (No auth system)
- [x] **2.5 Transactional Receipts** — N/A (Direct client inquiries via `contact@silverloft.me`)

## 3. Findability & DNS

- [x] **3.1 Domain Routing** — `silverloft.me` (root) and `www.silverloft.me` both resolve to live environment
- [x] **3.2 Meta Tags** — Custom page titles, descriptions, keywords, authors, and canonical URLs on all public pages
- [x] **3.3 Open Graph Tags** — OG tags and Twitter Summary Large Image cards configured in `app/layout.jsx`
- [x] **3.4 Sitemap Generation** — `sitemap.xml` dynamically generated via `app/sitemap.js` containing `/`, `/about`, `/privacy`, `/terms`
- [x] **3.5 Robots.txt** — `robots.txt` dynamically generated via `app/robots.js` allowing crawl and referencing sitemap

## 4. Performance & Speed

- [x] **4.1 Image Optimization** — Static assets compressed to WebP and video previews encoded as MP4
- [x] **4.2 Code Minification** — HTML/CSS/JS minified and code-split by Next.js compiler
- [x] **4.3 CDN Integration** — Fastly Edge CDN caching via GitHub Pages
- [x] **4.4 Browser Caching** — `_headers` configured for long-lived caching on edge platforms
- [x] **4.5 Database Indexing** — N/A (Static architecture)

## 5. Analytics

- [x] **5.1 Traffic Analytics** — Modular Google Analytics 4 integration implemented via `components/Analytics.jsx` (`NEXT_PUBLIC_GA_ID`)
- [x] **5.2 Internal Filtering** — Automatic client-side internal filter implemented (`lib/analytics.js`), excluding localhost and supporting `?internal=1`
- [x] **5.3 Conversion Tracking** — `lib/analytics.js` helper created for custom event dispatching
- [x] **5.4 Error Monitoring** — Client Error Boundary implemented (`app/error.jsx`) for runtime crash recovery
- [x] **5.5 Uptime Monitoring** — Health endpoint (`public/health.json`) + automated scheduled monitoring workflow (`.github/workflows/uptime-check.yml`)

## 6. Legal

- [x] **6.1 Privacy Policy** — Published at `/privacy` with comprehensive studio data policy
- [x] **6.2 Terms of Service** — Published at `/terms` covering studio scope, IP, and liability
- [x] **6.3 Cookie Consent** — N/A (No tracking cookies stored without user consent)
- [x] **6.4 Data Deletion Protocol** — N/A (Customer inquiries handled in email inbox)

## 7. Final Test Run

- [x] **7.1 Broken Link Check** — All project, social, and portfolio links verified live with 200/301/307 status codes
- [x] **7.2 Cross-Browser QA** — Modern browser support configured (`chrome >= 90`, `firefox >= 88`, `safari >= 14`, `edge >= 90`)
- [x] **7.3 Mobile Responsiveness** — Mobile navigation drawer and responsive layout verified
- [x] **7.4 Dummy Data Wipe** — Real founders and live case studies configured
- [x] **7.5 Live Payment Gateway** — N/A (Direct service contracts)
- [x] **7.6 Real Transaction Test** — N/A
- [x] **7.7 Refund Test** — N/A

---

## Progress Tracker

| Category | Items | Done |
|---|---|---|
| Security | 6 | 6 |
| Emails | 5 | 5 |
| Findability & DNS | 5 | 5 |
| Performance & Speed | 5 | 5 |
| Analytics | 5 | 5 |
| Legal | 4 | 4 |
| Final Test Run | 7 | 7 |
| **Total** | **37** | **37** |
