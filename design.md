# Design — Attend (QR Attendance System)

A locked design system for this app. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
`modern-minimal`

## Macrostructure Family
- Marketing / Landing: Two-column hero with live interactive QR scanner/generator visual simulation, live attendance ping feed, structured 3-step operational flow, anti-proxy security breakdown, and single-line restrained footer.
- App / Dashboard: Workbench — fast session initiator, quick metrics cards, live session cards, and tabular historical session overview.
- Live Session: Split-workbench — full-height projector-ready rotating QR display with countdown ring, anti-proxy token indicator, and real-time scanned student attendance roster.

## Theme — Cobalt Precision
- `--color-paper`: `oklch(98.8% 0.003 245)` (Cool crisp engineered canvas)
- `--color-paper-2`: `oklch(96.2% 0.006 245)` (Secondary surface)
- `--color-paper-3`: `oklch(92.5% 0.008 245)` (Card elevated border / subtle fill)
- `--color-ink`: `oklch(18% 0.015 250)` (Deep high-contrast charcoal ink)
- `--color-ink-2`: `oklch(45% 0.015 250)` (Secondary muted slate ink)
- `--color-rule`: `oklch(90% 0.006 245)` (Crisp structural border)
- `--color-accent`: `oklch(55% 0.22 258)` (Electric Cobalt signal)
- `--color-accent-ink`: `oklch(99% 0 0)` (White text on cobalt)
- `--color-success`: `oklch(66% 0.18 150)` (Emerald verified / scanned indicator)
- `--color-focus`: `oklch(55% 0.22 258)` (Cobalt focus ring)

## Typography
- Display: `Space Grotesk`, weight 600–700, style `normal` (italic headers banned), tracking `-0.03em`
- Body: `Inter`, weight 400–500, tracking `-0.01em`
- Mono: `JetBrains Mono`, weight 500, tabular numbers for tokens, roll numbers, countdown timers
- Display scale: `clamp(2.5rem, 5vw + 0.5rem, 4.5rem)`

## Spacing
4-point scale matching Tailwind CSS v4 tokens (`--space-*`).

## Motion
- Easings: `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-out`)
- Motion stance: `motion-on` (`motion/react` + `lenis`)
- Durations: short microinteractions 180–220ms, deliberate component transitions 320ms
- No bouncy overshoot or chaotic floats; disciplined, responsive, and functional

## Microinteractions Stance
- Pill-shaped CTAs with subtle scale response (`scale: 0.98` on click)
- Dynamic QR code rotation counter with progress ring
- Live attendance scanning pulse with emerald verified checkmarks
- Clean border highlights on hover (`var(--color-accent)`)

## CTA Voice
- Primary CTA: Black/Deep-cobalt pill button with crisp white typography and directional arrow icon (`rounded-full px-6 py-3 font-semibold text-sm`)
- Secondary CTA: Outline pill button with subtle hairline border and hover wash
- No cheesy marketing jargon; direct functional directives ("Start Attendance Session", "Scan QR Code", "View Dashboard")

## Exports

### tokens.css
```css
:root {
  --color-paper: oklch(98.8% 0.003 245);
  --color-paper-2: oklch(96.2% 0.006 245);
  --color-paper-3: oklch(92.5% 0.008 245);
  --color-ink: oklch(18% 0.015 250);
  --color-ink-2: oklch(45% 0.015 250);
  --color-rule: oklch(90% 0.006 245);
  --color-accent: oklch(55% 0.22 258);
  --color-accent-ink: oklch(99% 0 0);
  --color-success: oklch(66% 0.18 150);
  --color-focus: oklch(55% 0.22 258);

  --font-display: var(--font-space-grotesk), sans-serif;
  --font-body: var(--font-inter), sans-serif;
  --font-mono: var(--font-mono), monospace;

  --radius-card: 16px;
  --radius-pill: 9999px;
  --radius-input: 10px;
}
```
