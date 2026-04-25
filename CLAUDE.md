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

### AI Service Layer (`src/services/ai.js`)
- Uses Google Generative AI (`gemini-3.1-flash-lite-preview` model)
- **Critical**: API key is hardcoded in `ai.js` line 5 — should be moved to environment variables
- Implements phase-gated content generation (seduction → play → climax phases)
- Verb rotation system prevents repetitive "massage loop" behavior
- Fallback mechanical card generation when AI fails or is blocked by safety filters
- Post-processing regex corrects gender/anatomy terms based on actor/receiver roles

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
