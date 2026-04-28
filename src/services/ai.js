// import { GoogleGenerativeAI } from "@google-generative-ai/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { kinkyCards } from "../cards.js";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// Progress-based intensity instructions
const getProgressInstructions = (mode, progress) => {
  const progressPercent = Math.round(progress * 100);

  if (mode === "bff") {
    if (progress <= 0.33) {
      return `PHASE: WARM-UP (${progressPercent}% complete)
- Difficulty: 1 sip (easy)
- Focus: Simple truths, mild embarrassment, quick actions
- Examples: Show last text, do a quick impression, share a basic fact`;
    } else if (progress <= 0.66) {
      return `PHASE: HEATING UP (${progressPercent}% complete)
- Difficulty: 2 sips (medium)
- Focus: Social media stakes, longer actions, fun group challenges
- Examples: Let someone post on your story, speak in accent for 2 minutes, do a group challenge`;
    } else {
      return `PHASE: PEAK CHAOS (${progressPercent}% complete)
- Difficulty: 3 sips (hard)
- Focus: Maximum embarrassment, wild challenges, lasting consequences
- Examples: Swap shirts, eat weird food combo, do something memorable`;
    }
  }

  if (mode === "date") {
    if (progress <= 0.33) {
      return `PHASE: BREAKING THE ICE (${progressPercent}% complete)
- Difficulty: 1 sip (easy)
- Focus: Safe interactions, basic compliments, casual touch
- Examples: Hold hands, give a compliment, maintain eye contact`;
    } else if (progress <= 0.66) {
      return `PHASE: BUILDING TENSION (${progressPercent}% complete)
- Difficulty: 2 sips (medium)
- Focus: Flirty actions, closer contact, romantic gestures
- Examples: Massage, whisper in ear, play with hair, intimate touching`;
    } else {
      return `PHASE: SPICY FINALE (${progressPercent}% complete)
- Difficulty: 3 sips (hard)
- Focus: Bold moves, passionate actions, high chemistry
- Examples: Kiss on lips, intense makeout, cuddle close, romantic whispers`;
    }
  }

  // Couples mode - 4-part journey
  if (progress <= 0.15) {
    return `PHASE 1: WARMING UP TOGETHER (${progressPercent}% complete)
- Acts like BFF mode - keep it fun and playful!
- Difficulty: 1 sip (very easy)
- Focus: Fun interactions, laughter, light teasing, building comfort
- Examples: Share a secret, do a fun impression, playful dares, silly challenges
- GOAL: Break the ice and create a playful mood before getting intimate`;
  } else if (progress <= 0.5) {
    return `PHASE 2: BUILDING CHEMISTRY (${progressPercent}% complete)
- Regular couples mode - romantic and sensual
- Difficulty: 1-2 sips (light to medium)
- Focus: Kissing, touching, massage, compliments, romantic gestures
- ALLOWED: Making out, sensual touch, body massage, compliments
- STRICTLY FORBIDDEN: No genital contact yet
- Examples: Kiss passionately, give a massage, whisper compliments, cuddle`;
  } else if (progress <= 0.8) {
    return `PHASE 3: FOREPLAY & INTIMACY (${progressPercent}% complete)
- Focus on foreplay and building arousal
- Difficulty: 2 sips (medium intensity)
- Focus: Manual stimulation, oral play, teasing, sensual exploration
- ALLOWED: Hand jobs, fingering, oral sex, using toys, sensual touching
- Examples: Suck, lick, finger, rub, use toys on sensitive areas
- GOAL: Build intense pleasure before the finale`;
  } else {
    return `PHASE 4: CLIMAX & HAPPY ENDING (${progressPercent}% complete)
- Final phase - full intensity and penetration
- Difficulty: 3 sips (maximum intensity)
- Focus: Penetration, positions, intense pleasure, climax
- MANDATORY: Include sexual positions and penetration
- ALLOWED: Intercourse, any position, full intensity, "until finish" duration
- Examples: Fuck, penetrate, thrust, grind in various positions until climax
- GOAL: Mutual pleasure and satisfying ending`;
  }
};

// Mode-specific system prompts
const getSystemPromptForMode = (
  mode,
  man,
  woman,
  history,
  regenSeed,
  progress,
  players = [],
) => {
  const progressInstructions = getProgressInstructions(mode, progress);

  switch (mode) {
    case "bff":
      const playerList = players.map(p => `${p.name} (${p.gender})`).join(", ");
      return `You are a Party Game Host. You provide ONE fun, light-hearted dare for a "Do or Drink" game with friends.

IDENTITY SCHEMA:
- PLAYERS: ${playerList}

${progressInstructions}

REPETITION CONTROL:
- PREVIOUS ACTIONS: ${history.slice(0, 5).join(" | ") || "None"}.
- REGEN SEED: ${regenSeed}. If this is > 0, you MUST provide a different action than before.

STRICT STYLE:
- NO sexual content, nothing that would damage friendships
- Fun, embarrassing but not humiliating
- Focus on social media, phone content, funny physical challenges
- Include drink penalty matching the phase difficulty
- FORMAT: "[Player], [action] for [X seconds] or else drink [N] sip[s]."

IMPORTANT: If the action involves another player, reference them by name specifically.`;

    case "date":
      return `You are a Dating Game Host. You provide ONE flirty, romantic dare for a "Do or Drink" game on a date.

IDENTITY SCHEMA:
- ${man}: Player 1
- ${woman}: Player 2

${progressInstructions}

REPETITION CONTROL:
- PREVIOUS ACTIONS: ${history.slice(0, 5).join(" | ") || "None"}.
- REGEN SEED: ${regenSeed}. If this is > 0, you MUST provide a different action than before.

STRICT STYLE:
- Flirty and romantic, but NOT explicit or pornographic
- Build chemistry and tension gradually
- Match the intensity to the current phase
- Include drink penalty matching the phase difficulty
- FORMAT: "[Player], [action] [target] for [X seconds] or else drink [N] sip[s]."`;

    case "couples":
    default:
      return `You are a Technical Intimacy Director. You provide ONE blunt, mechanical command for a "Do or Drink" session.

IDENTITY SCHEMA:
- ${man}: MAN (Anatomy: Cock, Balls).
- ${woman}: WOMAN (Anatomy: Vagina, Clitoris, Breasts).

${progressInstructions}

REPETITION CONTROL:
- PREVIOUS ACTIONS: ${history.slice(0, 5).join(" | ") || "None"}.
- REGEN SEED: ${regenSeed}. If this is > 0, you MUST provide a different action than before.

STRICT STYLE:
- NO POETRY. No 'jagged', 'nectar', 'promises', or 'shudders'.
- Include drink penalty matching the phase difficulty
- FORMAT: "[Player], [action] [target]'s [part] for [X seconds] or else drink [N] sip[s]."`;
  }
};

export const generateKinkyCard = async (
  turn,
  total,
  setup,
  history = [],
  regenSeed = 0,
) => {
  const mode = setup.gameMode || "couples";
  const progress = turn / total;

  // Define default names for Date/Couples mode
  const man = setup.manName || "Aritra";
  const woman = setup.womanName || "Ms. Ghosh";

  // Determine actor and receiver based on mode
  let actor, receiver;

  if (mode === "bff" && setup.players && setup.players.length > 0) {
    // For BFF mode with multiple players
    const players = setup.players;
    const currentPlayerIndex = (turn - 1) % players.length;
    const nextPlayerIndex = turn % players.length;
    actor = players[currentPlayerIndex]?.name || "Player 1";
    receiver = players[nextPlayerIndex]?.name || "Player 2";
  } else {
    // For Date/Couples mode (2 players)
    const isManActing = turn % 2 !== 0;
    actor = isManActing ? man : woman;
    receiver = isManActing ? woman : man;
  }

  const isFinalTurn = turn === total;

  // 1. PHASE DETECTION (4-part journey for couples mode)
  const isPhase1 = progress <= 0.15; // Warming up (BFF-style)
  const isPhase2 = progress <= 0.5; // Building chemistry (romantic)
  const isPhase3 = progress <= 0.8; // Foreplay & intimacy
  const isPhase4 = progress > 0.8; // Climax & happy ending

  // 2. VERB INJECTION (only for couples mode - Forces variety and kills the 'massage' loop)
  const warmupVerbs = ["tease", "play with", "tickle", "charm", "surprise"];
  const romanceVerbs = ["kiss", "massage", "caress", "cuddle with", "embrace"];
  const foreplayVerbs = ["lick", "suck", "nibble", "finger", "tease"];
  const climaxVerbs = ["fuck", "penetrate", "thrust into", "grind on", "enter"];

  let currentVerb;
  if (mode === "couples") {
    currentVerb = isPhase1
      ? warmupVerbs[turn % warmupVerbs.length]
      : isPhase2
        ? romanceVerbs[turn % romanceVerbs.length]
        : isPhase3
          ? foreplayVerbs[turn % foreplayVerbs.length]
          : climaxVerbs[turn % climaxVerbs.length];
  } else {
    // For other modes, use simpler verb sets
    currentVerb = ["do", "try", "attempt", "perform"][turn % 4];
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: getSystemPromptForMode(
            setup.gameMode || "couples",
            man,
            woman,
            history,
            regenSeed,
            progress,
            setup.players || [],
          ),
        },
      ],
    },
  });

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate turn ${turn}/${total} (${Math.round(progress * 100)}% progress): ${actor} acting on ${receiver}.`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: Math.min(2.0, 1.1 + regenSeed * 0.1), // Increase randomness for each regeneration
        maxOutputTokens: 45,
        topP: 0.9,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE",
        },
      ],
    });

    let text = result.response.text().trim();
    if (!text || text.length < 5) throw new Error("Safety/Empty Block");

    // 3. BIOLOGY & IDENTITY GUARD (Post-processing regex)
    if (receiver === man) text = text.replace(/vagina|clit|pussy/gi, "cock");
    if (receiver === woman)
      text = text.replace(/cock|shaft|balls|frenulum/gi, "vagina");

    return text;
  } catch (error) {
    // 4. MECHANICAL FALLBACKS (Progress-aware for each mode)
    const mode = setup.gameMode || "couples";
    const timer = Math.floor(Math.random() * 60) + 30;

    // BFF Mode Fallbacks - Progress based
    if (mode === "bff") {
      if (progress <= 0.33) {
        // Warm-up phase
        const warmupDares = [
          `Show your most recent text message or else drink 1 sip.`,
          `Share your browser history for 10 seconds or else drink 1 sip.`,
          `Do your best impression of ${receiver} or else drink 1 sip.`,
          `Share an embarrassing childhood photo or else drink 1 sip.`,
          `Tell us your most used emoji or else drink 1 sip.`,
        ];
        return warmupDares[turn % warmupDares.length];
      } else if (progress <= 0.66) {
        // Heating up phase
        const heatDares = [
          `Let ${receiver} post a story from your phone or else drink 2 sips.`,
          `Speak in an accent for ${timer} seconds or else drink 2 sips.`,
          `Do an embarrassing dance for 15 seconds or else drink 2 sips.`,
          `Let everyone see your camera roll for 30 seconds or else drink 2 sips.`,
          `Text your crush "I'm thinking of you" or else drink 2 sips.`,
        ];
        return heatDares[turn % heatDares.length];
      } else {
        // Peak chaos phase
        const chaosDares = [
          `Swap shirts with ${receiver} for the rest of the game or else drink 3 sips.`,
          `Eat a spoonful of hot sauce or else drink 3 sips.`,
          `Let ${receiver} post anything on your social media or else drink 3 sips.`,
          `Do 20 pushups right now or else drink 3 sips.`,
          `Call a contact and sing "Happy Birthday" or else drink 3 sips.`,
        ];
        return chaosDares[turn % chaosDares.length];
      }
    }

    // Date Mode Fallbacks - Progress based
    if (mode === "date") {
      if (progress <= 0.33) {
        // Ice breaking phase
        const iceDares = [
          `Look into ${receiver}'s eyes for ${timer} seconds or else drink 1 sip.`,
          `Give ${receiver} a genuine compliment or else drink 1 sip.`,
          `Hold ${receiver}'s hand for ${timer} seconds or else drink 1 sip.`,
          `Share your first impression of ${receiver} or else drink 1 sip.`,
          `Sit shoulder to shoulder for ${timer} seconds or else drink 1 sip.`,
        ];
        return iceDares[turn % iceDares.length];
      } else if (progress <= 0.66) {
        // Building tension phase
        const tensionDares = [
          `Give ${receiver} a shoulder massage for ${timer} seconds or else drink 2 sips.`,
          `Whisper something in ${receiver}'s ear or else drink 2 sips.`,
          `Play with ${receiver}'s hair gently or else drink 2 sips.`,
          `Give ${receiver} a hug that lasts ${timer} seconds or else drink 2 sips.`,
          `Rest your head on ${receiver}'s shoulder or else drink 2 sips.`,
        ];
        return tensionDares[turn % tensionDares.length];
      } else {
        // Spicy finale phase
        const spicyDares = [
          `Kiss ${receiver} on the lips or else drink 3 sips.`,
          `Cuddle with ${receiver} for 2 minutes or else drink 3 sips.`,
          `Give ${receiver} a neck massage for ${timer} seconds or else drink 3 sips.`,
          `Whisper "I want you" in ${receiver}'s ear or else drink 3 sips.`,
          `Maintain intense eye contact for ${timer} seconds or else drink 3 sips.`,
        ];
        return spicyDares[turn % spicyDares.length];
      }
    }

    // Couples Mode Fallbacks - 4-part journey
    if (mode === "couples") {
      // For couples mode, determine who's acting for anatomical references
      const isManActing = turn % 2 !== 0;

      if (progress <= 0.15) {
        // Phase 1: Warming up (BFF-style fun)
        const warmupDares = [
          `${actor}, share an embarrassing story with ${receiver} or else drink 1 sip.`,
          `${actor}, do your best sexy dance for ${receiver} or else drink 1 sip.`,
          `${actor}, give ${receiver} 3 genuine compliments or else drink 1 sip.`,
          `${actor}, tell ${receiver} what you love about them or else drink 1 sip.`,
          `${actor}, pretend you're meeting ${receiver} for the first time with a cheesy pickup line or else drink 1 sip.`,
        ];
        return warmupDares[turn % warmupDares.length];
      } else if (progress <= 0.5) {
        // Phase 2: Building chemistry (romantic, no genital contact)
        const chemistryDares = [
          `${actor}, kiss ${receiver}'s neck for ${timer} seconds or else drink 1 sip.`,
          `${actor}, give ${receiver} a sensual back massage for ${timer} seconds or else drink 2 sips.`,
          `${actor}, maintain deep eye contact with ${receiver} for ${timer} seconds or else drink 1 sip.`,
          `${actor}, whisper something you love about ${receiver}'s body in their ear or else drink 1 sip.`,
          `${actor}, cuddle with ${receiver} and run your fingers through their hair or else drink 1 sip.`,
          `${actor}, trace your fingers along ${receiver}'s arms and shoulders or else drink 1 sip.`,
        ];
        return chemistryDares[turn % chemistryDares.length];
      } else if (progress <= 0.8) {
        // Phase 3: Foreplay & intimacy (manual/oral allowed)
        const foreplayDares = [
          `${actor}, kiss and lick ${receiver}'s inner thighs for ${timer} seconds or else drink 2 sips.`,
          `${actor}, use your mouth to pleasure ${receiver}'s ${isManActing ? "cock" : "clit"} for ${timer} seconds or else drink 2 sips.`,
          `${actor}, finger ${receiver}'s ${isManActing ? "pussy" : "ass"} gently for ${timer} seconds or else drink 2 sips.`,
          `${actor}, use a toy on ${receiver} or else drink 2 sips.`,
          `${actor}, give ${receiver} oral pleasure until they're breathless or else drink 2 sips.`,
          `${actor}, tease ${receiver}'s most sensitive spot with your tongue for ${timer} seconds or else drink 2 sips.`,
        ];
        return foreplayDares[turn % foreplayDares.length];
      } else {
        // Phase 4: Climax (full penetration, positions)
        const climaxPositions = [
          "Missionary",
          "Doggy style",
          "Cowgirl",
          "Lotus",
        ];
        const pos = climaxPositions[turn % climaxPositions.length];
        const climaxDares = [
          `${actor}, penetrate ${receiver} in ${pos} position for ${timer} seconds or else drink 3 sips.`,
          `${actor}, fuck ${receiver} in ${pos} until you both finish or else drink 3 sips.`,
          `${actor}, thrust deep into ${receiver} in ${pos} position for ${timer} seconds or else drink 3 sips.`,
          `${actor}, make love to ${receiver} in ${pos} position until climax or else drink 3 sips.`,
          `${actor}, grind against ${receiver} in ${pos} position until you both finish or else drink 3 sips.`,
        ];
        return climaxDares[turn % climaxDares.length];
      }
    }

    // Default fallback (shouldn't reach here)
    return `${actor}, kiss ${receiver} for ${timer} seconds or else drink 1 sip.`;
  }
};
