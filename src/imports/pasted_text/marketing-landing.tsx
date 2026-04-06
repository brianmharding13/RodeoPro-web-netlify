Add a marketing landing page to the RodeoPro app. This is a full-screen web page
at the route "/" (root) that serves as the public marketing site. The existing
mobile app prototype should still live at "/app" (or wrap all current routes
under "/app"). The landing page has a prominent CTA button that navigates to "/app"
(or "/app/runs") to enter the app prototype.

---

## DESIGN SYSTEM

Use the same design tokens already established in the app:
- Background: #111827 (dark, default)
- Card surface: #1F2937
- Brand accent / primary: #F59E0B (amber)
- Secondary accent: #0D9488 (teal)
- Body text: #F9FAFB
- Muted text: #9CA3AF
- Font: same as app (system sans-serif stack)
- Monospace / tabular nums for any time displays
- Border radius: 0.625rem base, 1rem for larger cards
- The page should be dark mode only (no toggle needed on the marketing page)

---

## PAGE STRUCTURE

### 1. NAVBAR (sticky, top)
- Left: RodeoPro wordmark — "RODEO" in white bold + "PRO" in #F59E0B bold,
  tracking-tight, font size xl
- Right: A single CTA button — "Open App →" — amber background (#F59E0B),
  dark text (#030213), rounded-full, font-semibold, px-5 py-2
  → navigates to /app (or /app/runs)
- Navbar background: #111827 with a subtle bottom border (#374151),
  backdrop-blur when scrolled

---

### 2. HERO SECTION
Full-viewport-height section, vertically centered content.

- Eyebrow label: "Built for barrel racers, by barrel racers" — small caps,
  amber color, letter-spacing wide, font-semibold
- H1 headline (large, bold, white):
  "Track Every Run.
   Own Every Record."
- Subheadline (muted text, max-width ~560px, centered):
  "RodeoPro is the performance tracker built specifically for competitive barrel
   racers. Log runs to the millisecond, monitor your horses across every arena,
   and watch your PRs fall."
- Two CTA buttons stacked horizontally:
  1. Primary: "Start Tracking Free" — amber fill, dark text, rounded-full,
     large (px-8 py-3), font-semibold → navigates to /app/runs
  2. Secondary: "See How It Works" — transparent with amber border, amber text,
     rounded-full, large → smooth scrolls to #features section
- Below buttons: subtle social proof line in muted text:
  "Trusted by barrel racers across the country"

- Background: dark (#111827) with a faint radial amber glow behind the headline
  (amber at ~5% opacity, large blur radius, centered)
- Optional: a decorative row of 3 large monospace time numbers in the background
  (e.g., "14.892  15.104  14.671") in very low opacity white, rotated ~-5deg,
  large text, acting as a texture element

---

### 3. PHONE MOCKUP / APP PREVIEW STRIP
A horizontal band (bg: #1F2937) showing 3 phone-frame mockup cards
side by side (or scrollable on mobile). Each phone frame is a rounded rectangle
(~280px wide, dark fill #111827, amber border ~1.5px, large border-radius ~2rem)
showing a screenshot or UI representation of a key screen:

Card 1 — "Log a Run"
  Show a simplified visual of the Add Run step 3 screen:
  - Large monospace time: "14.892s" in amber
  - Three barrel icons in a triangle arrangement (tappable in-app)
  - "Clean Run ✓" badge in green

Card 2 — "Track Your Horses"
  Show a simplified visual of the Horse Detail screen:
  - Horse avatar circle (amber) with letter "S"
  - "Personal Record" gradient amber card showing "14.671s"
  - Mini stat chips: "47 Runs · 38 Clean"

Card 3 — "Arena Insights"
  Show a simplified visual of the Arenas tab:
  - List of 2–3 arena rows (arena name, city/state, best time)
  - Each row has a teal arena icon and amber time badge

Below the phone frames, amber-colored section label:
"Everything you need, nothing you don't."

---

### 4. FEATURES SECTION  (id="features")
Section header (centered):
  - Amber eyebrow: "Features"
  - H2: "Performance tracking built around how you actually compete"
  - Muted subtext: "Every feature exists because a barrel racer asked for it."

6-card feature grid (3 columns on desktop, 2 on tablet, 1 on mobile):
Use card style: bg #1F2937, rounded-xl, p-6, amber left-border accent (4px)

Feature 1 — Millisecond Precision
  Icon: Timer (Lucide)
  Title: "Millisecond Precision"
  Body: "Log times to three decimal places. Because 14.891 and 14.892 are not the same run."

Feature 2 — Horse Profiles
  Icon: (horse silhouette or Star)
  Title: "Profiles for Every Horse"
  Body: "Track each horse independently — personal records, average times, clean run percentage, and earnings."

Feature 3 — Arena Analytics
  Icon: MapPin (Lucide)
  Title: "Per-Arena Insights"
  Body: "See your best time and run history at every arena you've competed in. Know your ground before you ride."

Feature 4 — Barrel Tracking
  Icon: (circle or target)
  Title: "Barrel-by-Barrel Logging"
  Body: "Mark exactly which barrels were knocked. Spot patterns in your runs and fix what's costing you time."

Feature 5 — Run Media
  Icon: Camera (Lucide)
  Title: "Photos & Video"
  Body: "Attach photos and videos directly to each run. Review your form, share your PRs, remember the good ones."

Feature 6 — Earnings Tracker
  Icon: DollarSign (Lucide)
  Title: "Track Your Earnings"
  Body: "Log payouts per run and see your total earnings across horses, arenas, and seasons."

---

### 5. STATS / SOCIAL PROOF BAND
Full-width band, bg: #F59E0B (amber), dark text (#030213).
3–4 large stat callouts centered, separated by subtle dividers:

  "14.671s"      "100%"           "$0"              "∞"
  Best time      Clean run goal   Monthly cost      Runs you can log
  tracked        to chase

Style: stat number in very large bold font (4xl–5xl), label below in smaller semibold.
This band uses amber as the background — the only section that inverts the color scheme.

---

### 6. HOW IT WORKS SECTION
Section header:
  - Amber eyebrow: "How It Works"
  - H2: "From the arena to your stats in seconds"

3-step horizontal flow (or vertical on mobile):
Each step has a large amber step number, title, and 1–2 sentence description.
Connect steps with a dashed amber line (desktop only).

Step 1 — Add Your Horses
  "Set up a profile for each horse you compete with. Add their registered name,
   barn name, display color, and current personal record."

Step 2 — Log Your Runs
  "After each competition, open RodeoPro and log your run in under 30 seconds.
   Time, arena, barrels, payout, and media — all in one place."

Step 3 — Watch Your Stats Grow
  "RodeoPro automatically calculates averages, tracks PRs, and builds your
   performance history across every horse and every arena."

Below steps, centered CTA:
  Button: "Try It Now — It's Free" → amber, large, rounded-full → /app/runs

---

### 7. TESTIMONIAL / QUOTE SECTION  (optional, can be placeholder)
Centered single testimonial card (bg: #1F2937, rounded-2xl, p-8, max-width 640px):
  Large amber quotation mark decorative element
  Quote text (white, font-medium, text-lg):
    "I used to keep times in a notes app. RodeoPro changed everything —
     I can finally see exactly how each horse performs at each arena."
  Attribution (muted):
    "— Sarah M., Competitive Barrel Racer"

---

### 8. FINAL CTA SECTION
Full-width section, centered, generous vertical padding.
  - H2 (white): "Ready to take your training seriously?"
  - Subtext (muted): "Your runs, your horses, your records. All in one place."
  - Large amber CTA button: "Open RodeoPro →"  → navigates to /app/runs
    (rounded-full, px-10 py-4, text-lg, font-bold, dark text)
  - Below button, muted small text: "No signup required to explore the prototype"

---

### 9. FOOTER
Dark footer (bg: #030213), py-8, px-6
- Left: RodeoPro wordmark (same as navbar)
- Center: "Built for barrel racers, by barrel racers" in muted amber text
- Right: "v1.0.0" in muted gray
- Full-width top border: #374151

---

## ROUTING / NAVIGATION NOTES

- The marketing page lives at "/" (root route)
- All existing app screens stay exactly as they are, but their base path
  becomes "/app" (e.g., /app/runs, /app/horses, /app/arenas, /app/account)
- The "Open App →" button in the navbar and all CTA buttons navigate to /app/runs
- Inside the app, the back-navigation from the app to the marketing site is NOT needed
  (the app prototype is self-contained once entered)
- If routing changes are complex, an acceptable alternative is to render the
  marketing page as a full-screen overlay/modal that dismisses to reveal the app

---

## RESPONSIVE BEHAVIOR

- Mobile (<640px): single column layout, hero text smaller, phone mockups
  scroll horizontally, feature grid is 1 column, how-it-works is vertical
- Tablet (640–1024px): 2-column feature grid, hero centered
- Desktop (>1024px): 3-column feature grid, side-by-side layouts where noted

---

## ANIMATION / INTERACTION NOTES

- Navbar CTA button: same active:scale-95 micro-interaction as app buttons
- Feature cards: subtle hover state — slight amber glow on border (box-shadow: 0 0 0 1px #F59E0B)
- CTA buttons: amber glow on hover (box-shadow with amber color at 40% opacity)
- Section entrance animations: optional fade-in-up on scroll using IntersectionObserver
  (keep lightweight, not required)
- Phone mockup cards: subtle hover lift (translateY -4px, transition 200ms ease)