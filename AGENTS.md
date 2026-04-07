# RodeoPro Web — Agent Instructions

This is a **Vite + React + TypeScript** web application serving as the marketing site and subscription onboarding flow for the RodeoPro platform. Its sole purpose is user sign-up and Stripe-powered payment. It is **not** a mobile app and does not replicate any app functionality.

Sister repos in the monorepo:
- `../RodeoPro-expo` — React Native / Expo mobile app (PowerSync + Supabase)
- `../RodeoPro-api` — Supabase Edge Functions backend (Deno)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Bundler | Vite 6 |
| UI | React 18, TypeScript |
| Routing | React Router 7 (`createBrowserRouter`) |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Components | shadcn/ui (Radix UI primitives) |
| Auth | Supabase Auth (`@supabase/supabase-js`) |
| Database | Supabase (shared Postgres with mobile app) |
| Payments | Stripe (`@stripe/stripe-js` + Stripe Checkout) |
| Animation | Motion (motion/react) |

---

## Environment

- **Node**: use `nvm use` in project root (`.nvmrc` is present)
- **Package manager**: `npm`
- **Dev server**: `npm run dev`
- **Build**: `npm run build`

### Environment Variables (`.env`)

```
VITE_SUPABASE_URL=https://yokpnzknankdmxxjfhfa.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

All env vars must be prefixed with `VITE_` to be exposed to the browser. Never hardcode keys in source files — always read via `import.meta.env.VITE_*`.

---

## Project Structure

```
src/
  main.tsx                        # Entry point
  app/
    App.tsx                       # Root: ThemeProvider → AuthProvider → RouterProvider
    routes.tsx                    # All routes (createBrowserRouter + RootLayout)
    context/
      AuthContext.tsx             # Supabase auth state (user, login, signup, logout)
      ThemeContext.tsx            # Dark/light theme
    components/
      auth/
        Login.tsx                 # /login
        SignUp.tsx                # /signup
        ProtectedRoute.tsx        # Redirects unauthenticated users to /login
      marketing/
        Landing.tsx               # / (public marketing page)
        PrivacyPolicy.tsx         # /privacy
        TermsOfService.tsx        # /terms
      subscription/
        Subscribe.tsx             # /subscribe (Stripe Checkout)
      account/
        AccountPage.tsx           # /account (authenticated, shows subscription status)
      ui/                         # shadcn/ui component library — do not edit manually
    data/
      mockData.ts                 # Temporary mock data — will be replaced by Supabase queries
  styles/
    index.css                     # Global styles
    theme.css                     # Theme tokens
public/
  _redirects                      # SPA fallback (Netlify)
```

---

## Routing

All routes are defined in `src/app/routes.tsx` using `createBrowserRouter`. A `RootLayout` wraps all routes and provides `<ScrollRestoration />`.

| Path | Component | Auth Required |
|---|---|---|
| `/` | Landing | No |
| `/signup` | SignUp | No |
| `/login` | Login | No |
| `/subscribe` | Subscribe | No (redirects to /signup if no user) |
| `/account` | AccountPage | Yes |
| `/privacy` | PrivacyPolicy | No |
| `/terms` | TermsOfService | No |

**Never add mobile-app routes** (runs, horses, arenas). That functionality lives in `../RodeoPro-expo`.

---

## Auth (Supabase)

The `AuthContext` will use `@supabase/supabase-js`. The Supabase project is **shared** with the Expo mobile app — do not create a separate project.

### Supabase Project
- URL: `https://yokpnzknankdmxxjfhfa.supabase.co`
- Tables: `users`, `horses`, `arenas`, `runs`, `media` (schema defined in `../RodeoPro-api`)

### Auth Flow
1. User lands on `/` → clicks "Get Started" → `/signup`
2. `signup()` calls `supabase.auth.signUp({ email, password })`
3. On success → redirect to `/subscribe`
4. `login()` calls `supabase.auth.signInWithPassword({ email, password })`
5. Session is persisted automatically by the Supabase client
6. `ProtectedRoute` reads session from `AuthContext` — redirects unauthenticated users to `/login`
7. `logout()` calls `supabase.auth.signOut()`

### Rules
- Always use a single `supabase` client singleton (create in `src/lib/supabase.ts`)
- Read credentials from `import.meta.env.VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Never call `createClient` outside of `src/lib/supabase.ts`

---

## Payments (Stripe)

The subscription flow uses **Stripe Checkout** (hosted checkout page), not embedded Elements.

### Flow
1. User reaches `/subscribe` (after signup or login with inactive subscription)
2. App calls the backend (`../RodeoPro-api` Edge Function) to create a Stripe Checkout Session
3. App redirects to `stripe.redirectToCheckout({ sessionId })`
4. Stripe redirects back to `/account?success=true` or `/subscribe?cancelled=true`

### Stripe Price IDs (to be configured)
- Monthly: `price_monthly_prod`
- Annual: `price_annual_prod`

### Rules
- The **publishable key** only goes in the frontend (`VITE_STRIPE_PUBLISHABLE_KEY`)
- The **secret key** lives exclusively in the `../RodeoPro-api` Edge Function — never in this repo
- Never process payments or call Stripe's server API from the frontend

---

## Styling Conventions

- Dark theme is primary: background `#111827`, surface `#1F2937`, border `#374151`
- Brand amber: `#F59E0B` (used for accent, CTAs, logo highlight)
- Text primary: `white` / `#F9FAFB`; secondary: `#9CA3AF`
- Use Tailwind utility classes — no inline styles, no `StyleSheet`
- All pages have a consistent nav with `RODEO`+`PRO` (amber) logo linking to `/`
- shadcn/ui components live in `src/app/components/ui/` — do not edit them manually; use the shadcn CLI to update

---

## Key Constraints

- **No mobile-app UI**: no bottom tab bars, no `MobileLayout`, no mobile-only components
- **No mock data in production paths**: `mockData.ts` is temporary scaffolding only
- **No server-side secrets in this repo**: all sensitive keys belong in `../RodeoPro-api`
- **Shared Supabase DB**: schema changes must be coordinated with `../RodeoPro-api` and `../RodeoPro-expo`
- **SPA routing**: `public/_redirects` handles Netlify fallback; all routes must be registered in `routes.tsx`
