// Frontend AI Service - Calls Cloudflare Worker
// All AI logic and API key are handled server-side

const WORKER_URL = process.env.REACT_APP_WORKER_URL;

/**
 * Generate a kinky card by calling the Cloudflare Worker
 * @param {number} turn - Current turn number
 * @param {number} total - Total number of turns
 * @param {object} setup - Game setup configuration
 * @param {string[]} history - Previous cards for repetition control
 * @param {number} regenSeed - Seed for regeneration variation
 * @returns {Promise<string>} The generated card text
 */
export const generateKinkyCard = async (
  turn,
  total,
  setup,
  history = [],
  regenSeed = 0
) => {
  if (!WORKER_URL) {
    throw new Error(
      "REACT_APP_WORKER_URL not configured. Please add your Cloudflare Worker URL to .env"
    );
  }

  const response = await fetch(WORKER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      turn,
      total,
      setup,
      history,
      regenSeed,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || `Worker error: ${response.status}`);
  }

  const { card } = await response.json();

  if (!card) {
    throw new Error("Empty response from worker");
  }

  return card;
};
