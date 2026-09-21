# Attend

A QR-based attendance system built for real classrooms — designed specifically to stop proxy attendance, not just digitize the register.

Teachers create a session and project a QR code on screen. Students scan it, enter their roll number and name, and are marked present instantly. The QR code **rotates every 10 seconds**, so a screenshot shared in a group chat is already useless by the time anyone tries to use it.

## The problem

Standard QR-based attendance systems are trivially gameable — one student scans, shares a screenshot, and half the absent class marks itself present. Attend is built around closing that specific gap, not just replacing a paper register with a digital one.

## Features

- **Rotating QR codes** — regenerated every 10 seconds using a time-windowed signed token, so static screenshots expire almost immediately
- **Live attendance tracking** — teachers see names appear in real time as students scan
- **No app required for students** — scan and submit via browser, nothing to install
- **Duplicate-proof** — one submission per roll number per session, enforced at the database level
- **Session expiry** — attendance can only be marked within the session's actual time window
- **CSV export** — one-click download of any session's attendance record
- **Teacher authentication** — email/password and OAuth (Google, GitHub) sign-in
- **Upcoming:**
    - Spotify OAuth

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Database:** PostgreSQL (Supabase), via Prisma ORM
- **Auth:** Better Auth (email/password + Google/GitHub OAuth)
- **Styling:** Tailwind CSS, HeroUI (customized theme)
<!-- - **QR generation:** `qrcode` -->

## Getting started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (this project uses Supabase)

### Installation

```bash
git clone https://github.com/rohitmondal03/Attend.git
cd Attend
npm install
```

### Environment variables

Create a `.env` file in the root:

```env
# Database (Supabase)
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://...pooler.supabase.com:5432/postgres"

# Better Auth
BETTER_AUTH_SECRET="your-generated-secret"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### Database setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. **Teacher creates a session** — subject, batch, date, and class timing
2. **QR code generates and rotates** — a new signed token every 10 seconds, encoding the session in a way that expires almost immediately
3. **Student scans and confirms** — a quick form (roll number + name), validated server-side against the active session window

## Project status

This is an active portfolio project, built incrementally and not yet deployed for live use. Contributions, feedback, and issue reports are welcome.

<!-- ## License

MIT -->
