# Pamusika — Zim Marketplace PRD

**Status:** Drafted 2026-06-08. Authoritative spec. Anything that contradicts this doc was decided here first.

## TL;DR

Multi-shop classifieds marketplace for Zimbabwe. Anyone with a phone can sign up, open a shop, and list anything for sale: vehicles, houses, electronics, fashion, services, jobs. Buyers browse, message sellers in-app, arrange off-platform. M0 (the existing fashion brand) becomes one shop on the platform — no special treatment.

Free to use. Revenue from optional $2-5/week boosted listings.

## Naming

| Thing | Name |
|---|---|
| Platform | **Pamusika** (Shona: "at the market") |
| Founding fashion shop | **M0** |
| Repo / domain (interim) | `m0/`, `m0-three.vercel.app` |
| Future domain | `pamusika.co.zw` (TBD) |

## Users

- **Buyer** — browses listings, sends DMs to sellers. Account optional for browsing, required to message.
- **Seller** — every buyer can become one by tapping "Sell something". Names their shop on first listing.
- **Admin** — moderates reports, suspends users. Internal only.

## Sign-up

- Phone number (Zim or international) + WhatsApp OTP via Twilio Verify (SMS fallback)
- One account per phone
- After verify: pick a display name + optional profile photo
- Shop creation deferred until first listing

## Shops

| Field | Notes |
|---|---|
| `slug` | URL-safe, lowercase, unique. Auto-generated from name. |
| `name` | Public-facing shop name. |
| `bio` | One-paragraph description. Optional. |
| `logo_url`, `banner_url` | Optional. Vercel Blob. |
| `verified` | Admin-toggled badge. Optional paid tier later. |
| `owner_user_id` | One owner per shop. One shop per user (v1). |

URL: `/shop/[slug]`.

## Listings

| Field | Notes |
|---|---|
| `shop_id` | FK |
| `category_id` | FK |
| `title` | <= 80 chars |
| `description` | <= 2000 chars, plain text |
| `price_usd_minor` | int. `0` = free listing |
| `is_negotiable` | bool |
| `condition` | enum `new` \| `like_new` \| `used_good` \| `used_fair` — required for goods, null for houses/jobs/services |
| `city` | enum (see below) |
| `status` | `active` \| `expired` \| `sold` \| `hidden` (admin) \| `deleted` |
| `published_at` | timestamp |
| `expires_at` | `published_at + 30 days` |
| `boosted_until` | timestamp, nullable |

- Up to **8 photos** per listing
- Photos stored on Vercel Blob
- Expiry: auto-archive at 30 days; user gets a WhatsApp ping to renew with 1 tap (free)
- Soft-delete; never hard-delete (admin audit trail)

URL: `/listing/[id]`.

## Categories (15 top-level)

1. Vehicles
2. Houses (sale + rent)
3. Land / Stands
4. Electronics
5. Phones
6. Computers / Laptops
7. Furniture
8. Appliances
9. Fashion (founding M0 shop lives here)
10. Baby & Kids
11. Beauty
12. Books, Music & Hobbies
13. Sports & Outdoors
14. Pets
15. Free Stuff
16. Jobs
17. Services

(Final count = 17 — close enough to "15-ish".)

## Locations

11 cities + "Other":

Harare, Bulawayo, Mutare, Gweru, Masvingo, Chinhoyi, Chitungwiza, Kwekwe, Marondera, Victoria Falls, Kadoma, Other.

City picker required at signup + per-listing.

## Chat

- In-app messaging. NOT WhatsApp links.
- "Message seller" on a listing → opens or creates a conversation thread
- Conversations are listing-scoped (each listing has its own thread per buyer)
- v1: HTTP polling every 5s for new messages
- v2: SSE or Pusher upgrade
- Read receipts: not in v1
- Image attachments: not in v1 (sellers can send a listing URL or text)

URL: `/messages` (list) + `/messages/[conversation_id]` (thread).

## Moderation

- Listings publish instantly. No pre-approval.
- Every listing + every shop has a **Report** button
- Reports go to `/admin/reports` queue with reason categories: spam, scam, prohibited, miscategorized, offensive, other
- Admin actions: dismiss report / hide listing / suspend user / ban user
- Strikes: 3 valid reports against a shop → auto-suspend pending review

## Revenue (boost slots)

- Free to list. No commission. No per-sale fee.
- Optional: pay to **boost** a listing for 7 days at **$3 USD** (flat).
- Boosted listings:
  - Pin to top of their category PLP
  - Eligible for homepage "Featured" carousel
  - Visual "Boosted" badge
- Payment: **Paynow** (Zim mobile money: EcoCash, OneMoney, InnBucks)
- Webhook flips `listings.boosted_until` on successful payment
- Refund policy: no refunds on boosts (industry standard)
- Revenue projection at 1k listings/month with 5% boost rate = ~150 boosts × $3 = $450/month. Covers infra easily.

## What we KILL

These features from the M0 v2 storefront are not in Pamusika v1 and should be deleted before Phase 1:

- Cart + checkout (`/cart`, `/checkout`, `/checkout/thanks`)
- Whop integration (`/api/checkout`, `/api/webhooks/whop`, `/api/admin/migrate-whop`, `src/lib/whop.ts`)
- Per-product variants table (listings are single-quantity)
- Order tables (`orders`, `order_items`)
- M0 admin product CRUD (`/admin/products`)
- M0 admin orders viewer (`/admin/orders`)
- M0 admin seed routes (`/api/admin/seed*`)
- All category-specific PLPs (`/women`, `/men`, `/kids`, `/new`, `/editorial`)
- PDP route (`/product/[slug]`)
- Currency switcher (USD only at launch; ZWG conversion comes back when listings demand it)
- Wishlist (replaced by saved listings — phase 3+)

## What we KEEP

- Next.js 15 App Router + Tailwind + Drizzle ORM + Neon Postgres
- Vercel Blob (for photos)
- Existing design tokens (typography, colour, spacing)
- Existing footer pages (`/about`, `/help/*`, `/legal/*`) — rewrite copy in Phase 8
- Existing admin gate primitive (`isAdmin`, rate limiter) — repurposed for admin moderation
- `nextReference()` order numbering utility — repurposed for boost transaction refs

## Phases

| # | Phase | Outcome |
|---|---|---|
| 1 | Schema + auth | Phone signup works, can create user. New tables live. |
| 2 | Shop + listing CRUD | Anyone can name a shop and post a listing with photos. |
| 3 | Discovery | Homepage, category PLPs, search, filters work. |
| 4 | Chat | Buyers can message sellers in-app. |
| 5 | Moderation | Reports queue. Admin can suspend. |
| 6 | Boost revenue | Paynow integration. Pay-to-boost. |
| 7 | M0 migration | 70 fashion SKUs become listings under M0 shop. |
| 8 | Rebrand | Pamusika identity across the site. |

## Open questions (deferred to v2)

- Saved listings / favourites
- Seller ratings
- Shop verification (paid)
- Negotiable counter-offers structured in chat
- Auction format
- Image attachments in chat
- Native mobile app (PWA covers it for now)
- Bulawayo seller cohort outreach
- ZWG pricing toggle
