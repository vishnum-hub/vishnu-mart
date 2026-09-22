# VishnuMart

A modern, frontend-only mini e-commerce demo built with React + Vite.

No backend, database, authentication, or payment gateway — the cart persists
to `localStorage` and checkout produces a fake order confirmation.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production files are output to `dist/`.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import that repository.
3. Vercel auto-detects Vite: Build Command `npm run build`, Output Directory `dist`. Leave the defaults and click **Deploy**.
4. Vercel gives you a public URL (e.g. `https://vishnumart.vercel.app`) — that's the link to share.

No environment variables or extra configuration are needed — this is a static site.

## Project structure

```
src/
  components/   Reusable UI pieces (header, footer, product card, etc.)
  pages/        Home, Products, ProductDetail, Cart, Checkout, OrderConfirmation
  context/      Cart state (React context + localStorage)
  data/         Sample product catalog
  index.css     All styling
  App.jsx       Lightweight view-state "router" (no router library needed)
  main.jsx      App entry point
```
