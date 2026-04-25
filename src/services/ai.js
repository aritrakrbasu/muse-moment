// import { GoogleGenerativeAI } from "@google-generative-ai/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { kinkyCards } from "../cards.js";

const genAI = new GoogleGenerativeAI("AIzaSyDO5KfPqzA6FcOVS1p6yAipKwm6ZB5zm2A");

export const generateKinkyCard = async (
  turn,
  total,
  setup,
  history = [],
  regenSeed = 0,
) => {
  const progress = turn / total;
  const isManActing = turn % 2 !== 0;

  // Anchor identity to biological roles to prevent swaps
  const man = setup.manName || "Aritra";
  const woman = setup.womanName || "Ms. Ghosh";
  const actor = isManActing ? man : woman;
  const receiver = isManActing ? woman : man;
  const isFinalTurn = turn === total;
  const timerInstruction = isFinalTurn
    ? "TIMER: Do NOT use numbers. Instead, use the phrase 'until you both finish' or 'until climax'."
    : "TIMER: Mandatory duration between 30-90 seconds (e.g., 'for 60 seconds').";

  const formatRule = isFinalTurn
    ? `FORMAT: "${actor}, [Action] ${receiver}'s [Part] in [Position] until you both finish."`
    : `FORMAT: "${actor}, [Action] ${receiver}'s [Part] for [Time]."`;
  // 1. POSITION & PHASE GATING
  const isSeduction = progress <= 0.25;
  const isFinalPhase = turn > total - 3; // Positions only allowed in final 3 cards

  const positionRule = isFinalPhase
    ? "MANDATORY: Include one random sexual position (e.g., Doggy style, Lotus, Cowgirl, 69, or Missionary)."
    : "STRICTLY FORBIDDEN: Do NOT mention any sexual positions or penetration yet.";

  // 2. VERB INJECTION (Forces variety and kills the 'massage' loop)
  const seductionVerbs = ["lick", "nibble", "whisper to", "bite", "trace"];
  const playVerbs = ["suck", "rub", "flick", "finger", "tongue"];
  const climaxVerbs = ["fuck", "penetrate", "thrust into", "grind on"];

  let currentVerb = isSeduction
    ? seductionVerbs[turn % seductionVerbs.length]
    : isFinalPhase
      ? climaxVerbs[turn % climaxVerbs.length]
      : playVerbs[turn % playVerbs.length];
  const model = genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite-preview",
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: `You are a Technical Sex Director. You provide ONE blunt, mechanical command for a 'Truth or Dare' session.
        
        IDENTITY SCHEMA:
        - ${man}: MAN (Anatomy: Cock, Balls).
        - ${woman}: WOMAN (Anatomy: Vagina, Clitoris, Breasts).

        REPETITION CONTROL:
        - PREVIOUS ACTIONS: ${history.slice(0, 5).join(" | ") || "None"}.
        - REGEN SEED: ${regenSeed}. If this is > 0, you MUST provide a different action than before.

        STRICT STYLE:
        - NO POETRY. No 'jagged', 'nectar', 'promises', or 'shudders'.
        - ACTION: You MUST use the verb '${currentVerb}'.
        - ${positionRule}
        - ${timerInstruction}
        - ${formatRule}"`,
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
              text: `Generate turn ${turn}/${total}: ${actor} acting on ${receiver}.`,
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
    // 4. MECHANICAL FALLBACKS (State-aware Truth or Dare commands)
    const timer = Math.floor(Math.random() * 60) + 30;
    const fallbackPositions = ["Doggy style", "Missionary", "Lotus", "Cowgirl"];
    const pos = fallbackPositions[turn % fallbackPositions.length];

    if (isSeduction)
      return `${actor}, ${currentVerb} ${receiver}'s neck for ${timer} seconds.`;
    if (isFinalPhase)
      return `${actor}, ${currentVerb} ${receiver}'s ${isManActing ? "vagina" : "cock"} in ${pos} until you finish.`;

    const part = isManActing ? "clit" : "cock";
    return `${actor}, ${currentVerb} ${receiver}'s ${part} for ${timer} seconds.`;
  }
};
