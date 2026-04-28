export const DIFFICULTY_LEVELS = {
  1: {
    id: 1,
    name: "Easy",
    sips: 1,
    color: "emerald",
    description: "Quick & easy",
    defaultDuration: 30,
    icon: "🫧",
  },
  2: {
    id: 2,
    name: "Medium",
    sips: 2,
    color: "amber",
    description: "Moderately challenging",
    defaultDuration: 60,
    icon: "💧",
  },
  3: {
    id: 3,
    name: "Hard",
    sips: 3,
    color: "rose",
    description: "Intense commitment",
    defaultDuration: 90,
    icon: "🌊",
  },
};

export const getDifficultyById = (id) => DIFFICULTY_LEVELS[id] || DIFFICULTY_LEVELS[1];

// Helper to determine difficulty from AI response
export const calculateDifficulty = (text, defaultDuration = null) => {
  // Check for "or else drink N sip(s)" pattern (new format)
  const drinkMatch = text.match(/drink\s+(\d+)\s*sip/i);
  if (drinkMatch) {
    const sips = parseInt(drinkMatch[1]);
    if (sips >= 1 && sips <= 3) return sips;
  }

  // Check for old explicit difficulty tags (for backwards compatibility)
  const explicitMatch = text.match(/\[DIFFICULTY:\s*(\d)\]/i);
  if (explicitMatch) {
    return parseInt(explicitMatch[1]);
  }

  // Check for "until finish" or "until climax" → max difficulty
  if (/\b(until\s+(finish|climax|both\s+finish)|continuous)\b/i.test(text)) {
    return 3;
  }

  // Duration-based calculation
  const durationMatch = text.match(/(\d+)\s*(?:seconds?|secs?|s)/i);
  if (durationMatch) {
    const duration = parseInt(durationMatch[1]);
    if (duration <= 30) return 1;
    if (duration <= 60) return 2;
    return 3;
  }

  // Keyword-based fallback for modes without explicit durations
  const easyKeywords = ["show", "tell", "say", "compliment", "hold hands", "kiss"];
  const hardKeywords = [
    "oral",
    "penetrate",
    "fuck",
    "intercourse",
    "vibrator",
    "inside",
    "thrust",
  ];

  const lowerText = text.toLowerCase();
  if (hardKeywords.some((kw) => lowerText.includes(kw))) return 3;
  if (easyKeywords.some((kw) => lowerText.includes(kw))) return 1;

  return 2; // Default to medium
};
