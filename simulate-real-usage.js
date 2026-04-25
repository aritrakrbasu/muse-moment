import { writeFileSync } from "fs";
import { generateKinkyCard } from "./src/services/ai.js";

// --- SIMULATION CONFIG ---
const totalTurns = 20;

// Ensure setup uses the keys 'manName' and 'womanName' to anchor biological roles
const setup = {
  manName: "Aritra",
  womanName: "Ms. Ghosh",
  toys: ["Silk Ties", "Ice", "Crop"],
};

const outputs = [];
let history = []; // 1. Initialize the history array

async function runStorySimulation() {
  console.log(`\n${"=".repeat(70)}`);
  console.log(`SIMULATING STORY MODE: ${totalTurns} Turns`);
  console.log(`MAN: ${setup.manName} | WOMAN: ${setup.womanName}`);
  console.log(`${"=".repeat(70)}\n`);

  for (let currentTurn = 1; currentTurn <= totalTurns; currentTurn++) {
    try {
      // 2. CALL THE ENGINE WITH HISTORY
      // Pass exactly 4 arguments: turn, total, setup, and history
      const card = await generateKinkyCard(
        currentTurn,
        totalTurns,
        setup,
        history,
      );

      // 3. UPDATE HISTORY
      // Add the latest card to the front and keep only the last 10 turns for context
      history = [card, ...history].slice(0, 10);

      const progress = currentTurn / totalTurns;
      let intendedBase = 1;
      if (progress > 0.2) intendedBase = 2;
      if (progress > 0.5) intendedBase = 3;
      if (currentTurn === totalTurns) intendedBase = 4;

      // Identify actor for the console log
      const actorName = currentTurn % 2 !== 0 ? setup.manName : setup.womanName;

      outputs.push({
        turn: currentTurn,
        base: intendedBase,
        actor: actorName,
        card: card,
      });

      console.log(
        `[Turn ${currentTurn}/${totalTurns}] Base ${intendedBase} | ${actorName} Acting`,
      );
      console.log(`   "${card}"`);
      console.log();
    } catch (error) {
      console.log(`   Error at Turn ${currentTurn}: ${error.message}`);
    }

    // Delay to prevent rate limiting
    await new Promise((r) => setTimeout(r, 800));
  }

  // --- SAVE RESULTS ---
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `./story-audit-${timestamp}.json`;
  writeFileSync(filename, JSON.stringify(outputs, null, 2));

  console.log(`\n${"=".repeat(70)}`);
  console.log(`STORY COMPLETE! Saved to: ${filename}`);
  console.log(`${"=".repeat(70)}`);
}

runStorySimulation();
