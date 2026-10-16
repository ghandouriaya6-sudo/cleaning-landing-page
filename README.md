# Brightwell Home Cleaning: portfolio landing page (fictional)

Files: `index.html`, `style.css`, `script.js`. No build step or dependencies (Google Fonts only, with system fallbacks).

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Deploy
Drag the folder into Netlify Drop, or push to GitHub and enable GitHub Pages, Cloudflare Pages or Vercel (static, no build command, root directory).

## Connect the form
The form never claims success without a backend. To go live:
1. Create an endpoint with Formspree, Getform, Basin, or your own server.
2. Put its URL in `index.html`: `<form id="form" ... data-endpoint="https://formspree.io/f/XXXX">`.
3. The script POSTs JSON. Add the service's CAPTCHA or Turnstile if spam appears. A honeypot field is already included.

## Replace before real use
- Business name, logo, phone, email, service area, privacy policy page and link
- Hero illustration: use real, licensed photography (compressed WebP/AVIF, with `width`/`height` and alt text)
- Fictional testimonials: delete or swap for real, permissioned reviews
- "Why Brightwell" placeholder: add licensing/insurance/background-check claims only if true
- Checklist items and FAQ answers to match your actual services; form endpoint; page title and meta description

## Test checklist
- Mobile: 360px and 768px widths, no sideways scroll, menu opens, closes (link tap, Esc)
- Navigation: every nav link and CTA lands on the right section
- Form: empty submit shows errors and focuses the first bad field; invalid email/ZIP rejected; demo mode shows the "not sent" message
- Accessibility: Tab through the whole page with visible focus, FAQ works with Enter/Space, test with a screen reader, check contrast, enable reduced motion
- Performance: run Lighthouse; check image sizes when photos are added
