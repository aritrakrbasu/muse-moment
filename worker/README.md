# Cloudflare Worker for Muse Moment

This worker handles ALL AI logic for the Muse Moment game server-side. The frontend simply sends game parameters and receives generated cards.

## What This Worker Does

- Accepts game state (turn, setup, history, regenSeed)
- Generates AI-powered cards using Google Gemini API
- Handles all prompts, phases, and fallbacks server-side
- Returns plain text card to frontend

## Deployment Steps

### 1. Install Dependencies

```bash
cd worker
npm install
```

### 2. Set Your Gemini API Key

```bash
npx wrangler secret put GEMINI_API_KEY
# Paste your Gemini API key when prompted
```

### 3. Deploy

```bash
npm run deploy
```

### 4. Copy Your Worker URL

After deployment, you'll see output like:
```
Published muse-moment-gemini-proxy (0.12 sec)
  https://muse-moment-gemini-proxy.aritrabasu71.workers.dev
```

### 5. Update Frontend .env

```bash
# In your project root .env file:
REACT_APP_WORKER_URL=https://muse-moment-gemini-proxy.YOUR_SUBDOMAIN.workers.dev
```

## Local Testing

To test locally:

```bash
npm run dev
# Worker runs at http://localhost:8787
```

Then update your `.env` temporarily:
```
REACT_APP_WORKER_URL=http://localhost:8787
```

## API Reference

### POST / (the worker root)

**Request Body:**
```json
{
  "turn": 1,
  "total": 10,
  "setup": {
    "gameMode": "couples",
    "manName": "Aritra",
    "womanName": "Ms. Ghosh"
  },
  "history": [],
  "regenSeed": 0
}
```

**Response:**
```json
{
  "card": "Aritra, kiss Ms. Ghosh's neck for 45 seconds or else drink 1 sip."
}
```

## Security Benefits

- ✅ API key never exposed to client
- ✅ All prompts are server-side
- ✅ Fallback logic is server-side
- ✅ Can add rate limiting later
- ✅ Free tier: 100k requests/day
