---
name: pre-launch-checklist
description: >-
  Comprehensive pre-launch checklist for web applications covering security,
  email authentication, DNS & SEO findability, performance, analytics, legal
  compliance, and live payment verification.
---

# Pre-Launch Checklist

Usage: check off items as `- [x]`. View progress in terminal with:
```bash
grep -c "\[x\]" pre-launch-checklist.md   # done
grep -c "\[ \]" pre-launch-checklist.md   # remaining
grep "\[ \]" pre-launch-checklist.md      # what's left
```

---

## 1. Security

- [ ] **1.1 Force HTTPS** — SSL certs valid; all HTTP traffic redirects to HTTPS
  - Test: `curl -I http://yourdomain.com` → expect `301`/`308` to `https://`
- [ ] **1.2 Password Cryptography** — passwords hashed + salted (bcrypt/Argon2) before DB storage
  - Verify: no plaintext/reversible password fields in DB schema
- [ ] **1.3 Environment Variables** — API keys, DB credentials, secrets kept out of frontend, stored in `.env`
  - Check: `.env` is in `.gitignore`; `grep -r "API_KEY\|SECRET" ./src` returns nothing hardcoded
- [ ] **1.4 Rate Limiting** — login, password reset, and core API routes throttled per IP
  - Test: hammer `/login` 20x in a loop, confirm 429s kick in
- [ ] **1.5 Input Sanitization** — all user input sanitized against SQLi and XSS
  - Test: submit `' OR 1=1--` and `<script>alert(1)</script>` in every form field
- [ ] **1.6 CORS Policy** — CORS restricted to authorized domains only
  - Check: `Access-Control-Allow-Origin` header is not `*` on prod

## 2. Emails

- [ ] **2.1 DNS Authentication** — SPF, DKIM, DMARC records configured
  - Test: `dig TXT yourdomain.com` / `mail-tester.com` score check
- [ ] **2.2 Onboarding Flow** — welcome email formatting, links, branding verified
- [ ] **2.3 Verification Flow** — "confirm your email" links expire correctly, DB status updates on click
- [ ] **2.4 Password Reset Flow** — reset token generates securely, routes to correct inbox
- [ ] **2.5 Transactional Receipts** — successful payments trigger invoice/receipt email

## 3. Findability & DNS

- [ ] **3.1 Domain Routing** — root domain and `www` subdomain both resolve to live environment
  - Test: `curl -I https://yourdomain.com` and `curl -I https://www.yourdomain.com`
- [ ] **3.2 Meta Tags** — unique Meta Titles and Descriptions on all public pages
- [ ] **3.3 Open Graph Tags** — OG tags + Twitter Cards render correct preview image/title/description
  - Test: paste URL into https://www.opengraph.xyz or share on Slack/Twitter
- [ ] **3.4 Sitemap Generation** — `sitemap.xml` auto-generated and submitted to Google Search Console
  - Test: `curl https://yourdomain.com/sitemap.xml`
- [ ] **3.5 Robots.txt** — allows public crawl, blocks admin/dashboard routes
  - Test: `curl https://yourdomain.com/robots.txt`

## 4. Performance & Speed

- [ ] **4.1 Image Optimization** — static images compressed, converted to WebP
- [ ] **4.2 Code Minification** — HTML/CSS/JS minified for prod build
- [ ] **4.3 CDN Integration** — static assets/media served via CDN
- [ ] **4.4 Browser Caching** — cache-control headers set for static assets
  - Test: `curl -I https://yourdomain.com/style.css` → check `Cache-Control` header
- [ ] **4.5 Database Indexing** — indexes added on heavily queried columns
  - Check: `EXPLAIN ANALYZE` on top slow queries

## 5. Analytics

- [ ] **5.1 Traffic Analytics** — tracking script installed (GA / Plausible / PostHog)
- [ ] **5.2 Internal Filtering** — team IPs excluded from analytics
- [ ] **5.3 Conversion Tracking** — event triggers set for key actions (signup, subscription start)
- [ ] **5.4 Error Monitoring** — error tracker installed (Sentry etc.) for frontend + backend
- [ ] **5.5 Uptime Monitoring** — ping/alert service configured (UptimeRobot etc.)

## 6. Legal

- [ ] **6.1 Privacy Policy** — published, details data collected + storage
- [ ] **6.2 Terms of Service** — published, covers rules/subscriptions/liability
- [ ] **6.3 Cookie Consent** — banner implemented if serving GDPR/CCPA users
- [ ] **6.4 Data Deletion Protocol** — users can delete account + wipe data

## 7. Final Test Run

- [ ] **7.1 Broken Link Check** — no 404s, dead links, missing images
  - Tool: `npx broken-link-checker https://yourdomain.com -ro`
- [ ] **7.2 Cross-Browser QA** — manually tested on Chrome, Safari, Firefox, Edge
- [ ] **7.3 Mobile Responsiveness** — audited on iOS/Android screen sizes
- [ ] **7.4 Dummy Data Wipe** — test users/fake entries/staging data cleared from prod
- [ ] **7.5 Live Payment Gateway** — switched from Test Mode to Live Mode
- [ ] **7.6 Real Transaction Test** — real card charged, funds confirmed clearing
- [ ] **7.7 Refund Test** — that transaction refunded, webhook confirmed updating subscription status to inactive

---

## Progress Tracker

| Category | Items | Done |
|---|---|---|
| Security | 6 | 0 |
| Emails | 5 | 0 |
| Findability & DNS | 5 | 0 |
| Performance & Speed | 5 | 0 |
| Analytics | 5 | 0 |
| Legal | 4 | 0 |
| Final Test Run | 7 | 0 |
| **Total** | **37** | **0** |
