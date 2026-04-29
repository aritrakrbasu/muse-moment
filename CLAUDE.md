# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Muse Moment is a "Do or Drink" party game web app with three game modes: BFF (friends), Date (dating), and Couples (intimate). Players receive AI-generated dares/challenges and can either complete them or drink as a penalty.

**Key architecture:** This is a React SPA with a separate Cloudflare Worker backend. All AI generation happens server-side through the worker to keep API keys secure.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

**Environment setup:** Copy `.env.example` to `.env` and set `REACT_APP_WORKER_URL` to your deployed Cloudflare Worker URL.

## Architecture

### Frontend (React SPA)
- **Entry point:** `src/App.js` - manages three game states: onboarding → playing → complete
- **Styling:** Tailwind CSS with dark theme (`#0a0a0a` bg, `#f4f4f5` text)
- **Animations:** Framer Motion for card transitions
- **State management:** React hooks (no external state library)
- **Icons:** Lucide React

### Backend (Cloudflare Worker)
Located in `worker/` directory. This is a separate deployable unit that:
- Wraps Google Gemini AI API calls
- Handles CORS for the frontend
- Contains mode-specific system prompts and fallback cards
- Must be deployed first with `GEMINI_API_KEY` secret set via `npx wrangler secret put GEMINI_API_KEY`

### Game Modes & Progression

The three modes (`src/config/modes.js`) each have distinct intensity curves:
- **BFF:** 3 phases (Warm-up → Heating Up → Peak Chaos)
- **Date:** 3 phases (Breaking Ice → Building Tension → Spicy Finale)  
- **Couples:** 4 phases (Warming Up → Building Chemistry → Foreplay → Climax)

Progress is calculated as `turn / totalTurns` and drives prompt intensity in the worker.

### Key Hooks

- **`useGameEngine`** (`src/hooks/useGameEngine.js`): Core game logic - handles card generation, difficulty calculation, regeneration, and stats tracking
- **`useTimer`** (`src/hooks/useTimer.js`): Countdown timer with haptic feedback and audio beep on completion

### Services

- **`ai.js`**: Frontend service that calls the Cloudflare Worker. Returns generated card text.
- **`weather.js`**: Fetches real-time weather/time data for environmental context (currently unused in prompts but available)

### Difficulty System

Difficulty (1-3) is auto-calculated from AI responses in `calculateDifficulty()` (`src/config/difficulty.js`):
- Parses "drink N sip" patterns
- Falls back to duration-based calculation (≤30s=1, ≤60s=2, >60s=3)
- Keyword-based fallback for intensity detection

### Actor/Receiver Logic

Players alternate turns each round. For Date/Couples modes: odd turns = man acts, even turns = woman acts. For BFF: cycles through `setup.players` array.

## Worker Deployment

The Cloudflare Worker (`worker/index.js`) must be deployed before the app can function:

```bash
cd worker
npm install
npx wrangler deploy
npx wrangler secret put GEMINI_API_KEY  # Prompts for key input
```

After deployment, copy the worker URL (e.g., `https://muse-moment-gemini-proxy.YOUR_SUBDOMAIN.workers.dev`) to `REACT_APP_WORKER_URL` in `.env`.

## Testing Strategy

- Component testing: `src/**/*.test.js` files use React Testing Library
- Manual game flow testing: Test all three modes with short turn counts (5-10 turns) to verify progression intensity
- Worker testing: Use `npx wrangler dev` for local worker development before deploying
