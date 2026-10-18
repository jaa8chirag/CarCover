# Signature Covers: Handover Guide

This is the website for Signature Covers (thesignaturecovers.com). This guide is for the owner and for whoever looks after the website next.

## What is in the site

| Part | Where | What it does |
|---|---|---|
| Public website | `/`, `/shop`, `/collections`, `/technology`, `/about`, `/contact` | Home, cover range, gallery, technology, about, contact (opens WhatsApp) |
| Cart and order | Cart drawer | Customer types brand, model and year, picks colour, then checks out |
| Admin panel | `/admin` | Orders, customers, product prices and stock |
| Shiprocket | `/api/shiprocket/...`, `/order-complete` | Online payment and delivery details (see below) |
| Database | MySQL | Products, orders. Tables are created automatically on first use |

The site is built with Next.js (Node.js) and runs on cPanel. The code lives on GitHub.

## Logging in to the admin panel

1. Open `https://yourdomain.com/admin`.
2. Enter the password you set as `ADMIN_PASSWORD`.

In the panel you can:
- **Orders:** open an order, change its status (New, Confirmed, In production, Shipped, Delivered, Cancelled), add the courier and tracking number, and write a private note.
- **Customers:** everyone who has ordered, with their latest address and total spend.
- **Products:** change a cover's name, price, stock, or hide it (Draft).

To change the admin password, change `ADMIN_PASSWORD` in cPanel (Setup Node.js App, Environment variables) and restart the app.

## Prices and GST

- Prices shown are before GST. Shipping is free. GST is 18% and is added at checkout.
- Current base prices: Outdoor Standard 3,899, Pro 5,499, Elite 8,999. Indoor Standard 2,499, Indoor Elite 5,499, Unveiling 8,499. Bespoke 26,999 (enquiry only).
- Change a price in **Admin > Products**. It changes the cart, checkout and the Shiprocket catalog together.
- The customer now types their own car, so the system cannot tell a small car from a big one. **Every cover is priced at its base price.** If a bigger car should cost more, adjust it with the customer on WhatsApp.
- The "Bespoke Covers" card on the shop page is an enquiry. Its price (26,999) is only text on the page, so to change it, edit `src/app/shop/page.tsx`.

## Orders: two ways they can arrive

1. **Shiprocket on (recommended).** The customer pays on Shiprocket's page, which also collects the address. The order shows as "Awaiting payment" and becomes "New" once payment succeeds.
2. **Shiprocket off.** The cart shows its own address form and the order arrives as "New" with no payment. You collect payment yourself (for example on WhatsApp).

The site uses way 1 automatically as soon as the Shiprocket key and secret are added (next section).

## Shiprocket

**What you need from Shiprocket:** an API Key and an API Secret for custom-website checkout. Ask your Shiprocket account manager.

**Switch it on:**
1. In cPanel, Setup Node.js App, add environment variables `SHIPROCKET_API_KEY`, `SHIPROCKET_API_SECRET` and `SITE_URL` (your live address with `https://`, no slash at the end). Restart the app.
2. Send Shiprocket these web addresses (replace `yourdomain.com`):
   - Products: `https://yourdomain.com/api/shiprocket/products`
   - Collections: `https://yourdomain.com/api/shiprocket/collections`
   - Products in a collection: `https://yourdomain.com/api/shiprocket/collection-products`
   - Order webhook (where Shiprocket reports orders): `https://yourdomain.com/api/shiprocket/webhook/order`
3. Place a small test order and check that it appears in the admin panel and moves from "Awaiting payment" to "New".

**How it stays safe:**
- The secret stays on the server and is never sent to the browser.
- Prices are taken from the database, never from the customer's browser.
- A webhook message is never trusted by itself. The site asks Shiprocket for the real status first, so nobody can fake a paid order.

**Not built yet (add later if needed):** refunds from the admin panel (the code to start a refund is ready in `src/lib/shiprocket.ts`), and Shiprocket's loyalty-points and catalog-change webhooks.

If Shiprocket ever stops working, remove the key and secret and restart. The site goes back to its own order form.

## Moving the website to a new owner

1. **GitHub:** repository Settings, "Transfer ownership", to the client's account (or add the client as an Owner).
2. **Hosting:** the client should own the cPanel/WHM account and the domain. Give them the domain login and the cPanel login.
3. **Database:** the MySQL database lives in their cPanel. Ask them to take a backup now and then (cPanel, Backup).
4. **Passwords:** set a new `ADMIN_PASSWORD` and a new long random `ADMIN_SECRET`. Never reuse the example values.
5. **Shiprocket:** the account and keys should be in the client's name.
6. **Secrets:** no password or key is stored in the code. They live only in the cPanel environment variables. Keep a copy of them somewhere safe.

## Updating the website

1. Change the code and push it to GitHub (`main`).
2. In cPanel, Git Version Control, Manage, **Update from Remote**, then **Deploy HEAD Commit**.

Full set-up steps for a new server are in `DEPLOY.md`.

## Visitor tracking: Microsoft Clarity and Google Search Console

- **Microsoft Clarity** (recordings and heatmaps): create a free project at clarity.microsoft.com, copy its Project ID, then add it as the environment variable `NEXT_PUBLIC_CLARITY_ID`. The ID is built into the site, so after adding it you must rebuild and restart (see "Updating the website"). It is never loaded on `/admin`.
- **Google Search Console** (how Google sees the site): add `thesignaturecovers.com` as a *Domain* property and verify it with the DNS TXT record Google gives you (add it in Cloudflare). Then submit `https://thesignaturecovers.com/sitemap.xml`. The site already publishes `/sitemap.xml` and `/robots.txt`.
- Clarity records what visitors do on the pages, so mention analytics in your privacy policy.

## SEO: what is already done

- **Every page** has its own title, description, canonical address and social-share card (WhatsApp, Facebook, X). Share image: `public/og-image.jpg`. The text lives in each page's `layout.tsx` (home: `src/app/layout.tsx`).
- **Headings:** each page has one main heading (h1), with sections as h2 and questions as h3.
- **Structured data (what Google reads):** the business (Organization and LocalBusiness), the website, the product list and a Product with price for every cover, breadcrumbs, and the home page FAQ.
- **`/sitemap.xml`, `/robots.txt`** and a web app manifest are generated automatically. `/admin`, `/api` and `/order-complete` are hidden from Google.
- **Speed:** photos are compressed and cached for a month in the browser; page text is compressed; basic security headers are on.
- **Home page text and FAQ:** `src/components/HomeIntro.tsx`. Keep the FAQ answers true, because Google shows them.

To change a page's title or description, edit its `layout.tsx` and redeploy. Prices in the structured data follow the shop prices automatically.

## Things to know

- **Photos** are in `public/images`. Replace a file with one of the same name to change a picture.
- **Hero slides** (home page top) are in `src/components/HypeCurtainScrollShowcase.tsx`. The list at the top of that file holds each slide's heading, photos and buttons, with separate photos for phones and laptops.
- **Header and footer:** `src/components/Header.tsx` and `src/components/Footer.tsx`.
- **WhatsApp number** is `918585996669` (search the code for it to change it).
- **Where orders go:** the orders table in MySQL. The admin panel is just a view of it.
- **If the site shows "We could not save your order":** the database is not reachable. Check the `DB_*` settings and that the database user has full rights on the database.
