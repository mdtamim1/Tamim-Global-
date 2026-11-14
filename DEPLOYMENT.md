# 🚀 Deployment Guide — Tamim Global Portfolio

> **Target platform:** Vercel (recommended) | **Domain:** `tamimglobal.com`

---

## Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free) → [vercel.com](https://vercel.com)
- [ ] Domain access to `tamimglobal.com` (DNS panel)
- [ ] Formspree account (optional, for contact form emails)
- [ ] Node.js 20+ installed locally

---

## Step 1 — Push to GitHub

```bash
# Inside the tamim-labs/ folder:
git init
git add .
git commit -m "feat: initial portfolio build — Tamim Global"

# Create a new repo on GitHub (name it: tamim-global-portfolio)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/tamim-global-portfolio.git
git branch -M main
git push -u origin main
```

> ⚠️ **Never commit `.env.local`** — it's already in `.gitignore`. Environment variables go in Vercel dashboard only.

---

## Step 2 — Deploy on Vercel

### 2a. Import the Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub account → find `tamim-global-portfolio`
4. Click **"Import"**

### 2b. Configure Build Settings

Vercel auto-detects Next.js. Confirm these settings:

| Setting | Value |
|---|---|
| Framework Preset | **Next.js** |
| Root Directory | `./` (default) |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto) |
| Install Command | `npm install` |

### 2c. Add Environment Variables

In the **"Environment Variables"** section before clicking Deploy:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_ADMIN_PASSWORD` | `your-secret-password` | ⚠️ Change from default! |
| `NEXT_PUBLIC_FORMSPREE_ID` | `xyzabc123` | Get from formspree.io (optional) |

> 💡 **Admin Password:** Change it from `tamim2024` to something strong before deploying!

### 2d. Deploy!

Click **"Deploy"** — first build takes ~2 minutes. You'll get a preview URL like:
`https://tamim-global-portfolio.vercel.app`

---

## Step 3 — Connect Custom Domain (`tamimglobal.com`)

### 3a. Add Domain in Vercel

1. Go to your project → **Settings** → **Domains**
2. Type `tamimglobal.com` → click **"Add"**
3. Also add `www.tamimglobal.com` (Vercel will auto-redirect www → root)

### 3b. Configure DNS Records

Log into your domain registrar (GoDaddy / Namecheap / Google Domains / etc.) and set:

**For root domain (`tamimglobal.com`):**
```
Type:  A
Name:  @
Value: 76.76.21.21
TTL:   Auto (or 3600)
```

**For www subdomain:**
```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   Auto (or 3600)
```

> ⏱️ DNS propagation takes **15 minutes to 48 hours**. Usually done within 1 hour.

### 3c. SSL Certificate

Vercel provisions **free SSL automatically** once DNS propagates. No action needed.

---

## Step 4 — Post-Deployment Verification

Run through this checklist after your domain is live:

### Visual & Functional
- [ ] Homepage loads with preloader animation
- [ ] 3D hero scene renders (or fallbacks gracefully on mobile)
- [ ] Custom cursor works on desktop
- [ ] Smooth scroll works
- [ ] All sections visible: Hero → Work → Services → Process → Stack → About → Contact
- [ ] Dark mode looks correct on all devices
- [ ] `tamimglobal.com/work/tatka-bazar` loads case study

### Mobile QA (Critical!)
- [ ] Test at 360px width (small Android)
- [ ] Test at 390px width (iPhone 14)
- [ ] Test at 768px width (tablet)
- [ ] Navigation menu works on mobile
- [ ] Text is readable, no overflow
- [ ] Touch targets are large enough

### Admin Panel
- [ ] `tamimglobal.com/admin` loads login page
- [ ] Password works (the one you set in Vercel env vars)
- [ ] Can add/edit a project
- [ ] Export JSON works
- [ ] Import JSON works

### SEO & Technical
- [ ] `tamimglobal.com/sitemap.xml` renders XML
- [ ] `tamimglobal.com/robots.txt` is accessible
- [ ] `/admin` route is blocked in robots.txt ✓
- [ ] Open Graph image shows when sharing link (after adding `/public/og-image.png`)
- [ ] No console errors in production

### Performance (Lighthouse)
Run in Chrome DevTools → Lighthouse tab (use Incognito mode):
- [ ] Performance: **90+**
- [ ] Accessibility: **95+**
- [ ] Best Practices: **95+**
- [ ] SEO: **100**

---

## Step 5 — Set Up Contact Form (Formspree)

1. Go to [formspree.io](https://formspree.io) → Create free account
2. Create a new form → copy the **Form ID** (looks like `xyzabc12`)
3. In Vercel: **Settings → Environment Variables** → Add:
   ```
   NEXT_PUBLIC_FORMSPREE_ID = xyzabc12
   ```
4. Trigger a new deployment (Settings → Deployments → Redeploy)
5. Test the contact form → check your email

---

## Assets Checklist (Add Before Going Live)

These files don't exist yet — add them for the full premium experience:

### Portrait Photo
```
📁 public/images/tamim-portrait.jpg
   • Size: 800×1000px minimum
   • Format: JPG (optimize to <200KB with squoosh.app)
   • Used in: About section
```

### Project Cover Images
```
📁 public/images/projects/
   ├── tatka-bazar.jpg         (1200×800px)
   ├── saas-dashboard.jpg      (1200×800px)
   └── agency-marketing.jpg    (1200×800px)
   • Format: JPG, optimized to <300KB each
   • Used in: Work section project cards
```

### OG / Social Share Image
```
📁 public/og-image.png
   • Size: 1200×630px (exact)
   • Shows: Your name, tagline, design — looks great when shared on WhatsApp/LinkedIn
   • Tools: Figma, Canva, or any image editor
```

### Noise Texture (Optional)
```
📁 public/textures/noise.png
   • Size: 200×200px, subtle grain
   • Effect: Adds depth to background (graceful fallback exists without it)
   • Download from: transparenttextures.com (search "noise")
```

---

## Content Personalization Checklist

Update `data/content.json` (or use the Admin panel) with real info:

- [ ] **Hero:** Your actual tagline and CTA text
- [ ] **About:** Real bio, years of experience, project count
- [ ] **Contact:** Real email, WhatsApp number
- [ ] **Social links:** GitHub, LinkedIn, Twitter/X, Behance URLs
- [ ] **Projects:** Add your real projects with descriptions and live URLs
- [ ] **Services:** Adjust to match what you actually offer
- [ ] **Stack:** Update to reflect your actual tech stack
- [ ] **Testimonials:** Add 2–3 real client testimonials

Also update in `src/app/layout.tsx`:
```typescript
// Find the JSON-LD sameAs array and replace with your real URLs:
"sameAs": [
  "https://github.com/YOUR_GITHUB",
  "https://linkedin.com/in/YOUR_LINKEDIN",
  "https://twitter.com/YOUR_TWITTER"
]
```

---

## Updating Content After Deployment

**Workflow A — Via Admin Panel (Quick edits):**
1. Go to `tamimglobal.com/admin` → login
2. Edit content in the panels
3. Click **"Export JSON"** → save the file
4. Replace `data/content.json` in your project
5. `git add . && git commit -m "content: update projects" && git push`
6. Vercel auto-deploys in ~1 minute

**Workflow B — Direct file edit (Developers):**
1. Edit `data/content.json` directly
2. `git add . && git commit -m "content: ..." && git push`
3. Done!

---

## Troubleshooting

| Issue | Fix |
|---|---|
| Build fails on Vercel | Check build logs for TypeScript errors. Run `npm run build` locally first |
| Domain not connecting | Verify DNS records, wait 24h, check Vercel domain status |
| Admin password not working | Verify `NEXT_PUBLIC_ADMIN_PASSWORD` env var in Vercel, redeploy |
| Contact form not sending | Add `NEXT_PUBLIC_FORMSPREE_ID` to Vercel env vars, redeploy |
| 3D scene not loading | Normal on some mobile GPUs — WebGL fallback shows gradient hero |
| Images not showing | Confirm image files exist in `/public/images/` and filenames match `content.json` |
| Sitemap not updating | Vercel caches — trigger manual redeploy or wait for next push |

---

## Security Notes

> ⚠️ The admin panel uses **client-side password protection only**. This is suitable for a personal portfolio but is not enterprise-grade security. The admin route is blocked from search engines via `robots.txt` and `noindex` meta tags.

**Recommendations:**
- Use a strong admin password (16+ characters)
- Do not store sensitive data in the admin panel
- Consider adding IP allowlisting in Vercel if needed
- Rotate the admin password periodically

---

## Support & Resources

| Resource | URL |
|---|---|
| Vercel Docs | [vercel.com/docs](https://vercel.com/docs) |
| Next.js Docs | [nextjs.org/docs](https://nextjs.org/docs) |
| Formspree Docs | [help.formspree.io](https://help.formspree.io) |
| DNS Checker | [dnschecker.org](https://dnschecker.org) |
| Image Optimizer | [squoosh.app](https://squoosh.app) |
| OG Image Tester | [opengraph.xyz](https://opengraph.xyz) |
| Lighthouse | Chrome DevTools → Lighthouse tab |

---

*Built with ❤️ by Tamim — Tamim Global © 2024*

