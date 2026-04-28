# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Muse Moment is a React-based intimate card game for couples. The app generates AI-powered "dare cards" using Google's Gemini AI, with a progressive intensity system across configurable session lengths.

## Development Commands

```bash
npm start          # Start dev server (localhost:3000)
npm test           # Run tests in watch mode
npm run build      # Create production build
```

## Architecture

### Core Game State Machine
The app uses a `gameState` state machine with four phases:
- `onboarding` - Multi-step setup (names → duration → toy selection)
- `playing` - Active card display with pulse timer
- `complete` - Session completion screen
- `souvenir` - Timeline review of the session

### AI Service Layer (`src/services/ai.js` + `worker/`)

**Frontend (`src/services/ai.js`)**:
- Thin client that sends game parameters to Cloudflare Worker
- Only dependency: `REACT_APP_WORKER_URL` environment variable
- No API keys or AI logic in the browser

**Worker (`worker/index.js`)**:
- Handles ALL AI logic server-side using `@google/generative-ai`
- Phase-gated content generation (seduction → play → climax phases)
- Verb rotation system prevents repetitive "massage loop" behavior
- Fallback mechanical card generation when AI fails
- Post-processing regex corrects gender/anatomy terms based on actor/receiver roles
- API key stored as Cloudflare Worker secret (`GEMINI_API_KEY`)

### Progression System
- Session progress (0.0 to 1.0) gates content types:
  - ≤0.25: Seduction phase (foreplay, no penetration/positions)
  - >0.25 to final-3: Play phase (oral, manual stimulation)
  - Final 3 turns: Climax phase (positions, penetration, "until finish" duration)

### Timer & Haptics
- `startPulseTimer()` creates a countdown with synchronized vibration pulses
- Uses Web Audio API for end-of-timer beep
- `navigator.vibrate()` for haptic feedback (mobile devices)
- Timer blocks "Next Command" button while active

### Styling
- Tailwind CSS with PostCSS/Autoprefixer
- Framer Motion for animations
- Lucide React for icons
- Custom dark theme: `#020202`/`#050505` backgrounds, rose-600 accent, zinc grays

## Key Technical Details

- **Alternating turns**: Odd turns = man acts, even turns = woman acts (based on `turn % 2 !== 0`)
- **Entropy injection**: Random salt on every turn prevents repetitive AI outputs
- **Regen seed**: Incrementing seed forces AI variation when user regenerates
- **History**: Stores last 10 cards, passed to AI to prevent repetition
- **Biology guard**: Post-processing regex ensures anatomical terms match the receiver's gender

## Deployment

### Production (GitHub Pages / Netlify / Vercel)

**ALL AI logic runs server-side** - deploy the Cloudflare Worker first:

```bash
# 1. Deploy the Cloudflare Worker
cd worker
npm install
npx wrangler secret put GEMINI_API_KEY  # Paste your Gemini API key
npm run deploy

# 2. Copy the worker URL from output, then update root .env:
# REACT_APP_WORKER_URL=https://muse-moment-gemini-proxy.xxx.workers.dev

# 3. Build and deploy the React app
cd ..
npm run build
# Deploy the build/ folder to your hosting provider
```

**Security**: The API key never leaves the server. The frontend only knows the worker URL.

### Local Development (optional)

For local testing without the worker, you can set `REACT_APP_GEMINI_API_KEY` in `.env` - but this is **NOT recommended** as the key will be visible in the browser.
