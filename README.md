# Pamusika

Zim multi-shop marketplace. Free listings, in-app chat, optional $3/wk boosts.

## Status

**Phase 0 — Design preview** (current).
Static deploy of the polished claude-design handoff. Inter font, light-mode default with dark toggle, real Unsplash photos.

**Phase 1 — Next.js + auth** (next).
Scaffold Next.js 15 + Drizzle + Neon + Twilio Verify OTP. Sign-up by phone, session cookie, drop in Pamusika tokens as global CSS.

**Phase 2 — Shop + listings**, **Phase 3 — Discovery**, **Phase 4 — Chat**, **Phase 5 — Moderation**, **Phase 6 — Boost revenue**.

See [`docs/PAMUSIKA.md`](docs/PAMUSIKA.md) for the full PRD.

## Layout

```
pamusika/
├── docs/PAMUSIKA.md       Full spec
├── drizzle/0000_init.sql  Postgres schema (users, shops, listings, …)
├── handoff-design/        ← currently served at root
├── vercel.json            Static-site config pointing at handoff-design/
└── README.md
```
