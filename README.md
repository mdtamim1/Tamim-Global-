# Tamim Global — Portfolio

> **Ultra-premium personal portfolio.** Built to Awwwards standard.  
> Full-stack web designer & developer from Dhaka, Bangladesh.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build && npm start
```

## 🔑 Admin Panel

Go to **`/admin`** after starting the server.

Default password: `tamim2024`  
→ Change it in `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=your-strong-password
```

**Publishing workflow:**
1. Edit content in the admin panel
2. Click **Export JSON** → downloads `content.json`
3. Replace `data/content.json` in the project
4. `git commit -m "content: update projects"` → push → Vercel auto-deploys

## 🌐 Contact Form (Formspree)

The contact form works out of the box with a simulated success state.  
To receive real emails, add your Formspree ID to `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_ID=xbjwppkr
```

Get a free ID at [formspree.io](https://formspree.io).

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx           # Homepage (server, JSON-LD)
│   ├── layout.tsx         # Root layout, fonts, SEO, skip-link
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── not-found.tsx      # 404 page
│   ├── admin/             # Admin panel (/admin)
│   └── work/[slug]/       # Case study pages
├── components/
│   ├── 3d/                # Three.js hero scene
│   ├── admin/panels/      # 9 admin panel components
│   ├── layout/            # Navbar, Footer, SmoothScrollProvider
│   ├── sections/          # All homepage sections
│   └── ui/                # Cursor, Preloader, LiveDemoButton, etc.
├── hooks/
│   ├── useAdminContent.ts # Admin CRUD + localStorage
│   ├── useMagneticButton.ts
│   └── useScrollReveal.ts
├── lib/
│   ├── animations.ts      # Centralised Framer Motion variants
│   ├── content.ts         # Content loader (content.json)
│   └── utils.ts           # cn() helper
└── types/index.ts         # Shared TypeScript interfaces

data/
└── content.json           # THE source of truth for all content

public/
├── robots.txt
├── images/                # Add project covers + portrait here
│   ├── tamim-portrait.jpg
│   └── projects/
└── textures/
    └── noise.png          # Optional subtle noise texture
```

## 🖼️ Adding Your Images

| File | Where used |
|---|---|
| `/public/images/tamim-portrait.jpg` | About section portrait |
| `/public/images/projects/your-project.jpg` | Project card covers |
| `/public/og-image.png` | OpenGraph social share (1200x630) |

## 🎨 Design Tokens

All visual values are centralised in:
- `tailwind.config.ts` — Tailwind theme extension
- `src/app/globals.css` — CSS custom properties
- `src/lib/animations.ts` — Framer Motion variants

**Never hardcode colours, spacing, or animations.** Use the tokens.

## 📡 Deployment (Vercel)

1. Push this repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
   - `NEXT_PUBLIC_FORMSPREE_ID` (optional)
4. Attach your custom domain

> **Build command:** `npm run build`  
> **Output directory:** `.next` (auto-detected)  
> **Node version:** 20+

## 🔒 Security Notes

- The `/admin` route uses a **client-side password gate only**. It prevents casual access but is not cryptographically secure.
- For production-grade security, replace with [NextAuth.js](https://next-auth.js.org/) or [Clerk](https://clerk.com/).
- `.env.local` is git-ignored. Never commit secrets.

## 📋 Build Phase Checklist

| Phase | Status |
|---|---|
| Phase 1: Design system, fonts, layout shell | Done |
| Phase 2: Preloader, Hero 3D scene, smooth scroll, cursor | Done |
| Phase 3: Work section, case study pages, Live Demo system | Done |
| Phase 4: Services, Process, Stack, About, Testimonials, Contact | Done |
| Phase 5: Admin panel, content.json management | Done |
| Phase 6: Polish, SEO, performance, accessibility | Done |

---

Built with Next.js 16 · TypeScript · Tailwind CSS · Framer Motion · Three.js · Lenis
