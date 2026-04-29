import { useState, useCallback } from "react";
import { generateKinkyCard } from "../services/ai";
import { calculateDifficulty } from "../config/difficulty";

const extractSeconds = (text, isLast) => {
  if (isLast) return null;
  const match = text.match(/\d+/);
  return match ? parseInt(match[0]) : 30;
};

export const useGameEngine = (setup, totalTurns) => {
  const [loading, setLoading] = useState(false);
  const [currentCard, setCurrentCard] = useState({
    text: "",
    difficulty: 1,
    actionTaken: null,
  });
  const [history, setHistory] = useState([]);
  const [regenSeed, setRegenSeed] = useState(0);
  const [gameStats, setGameStats] = useState({
    daresCompleted: 0,
    drinksTaken: 0,
    totalSips: 0,
  });

  const handleNextTurn = useCallback(
    async (turn) => {
      if (turn > totalTurns) {
        return "complete";
      }

      setLoading(true);
      const randomSalt = Math.floor(Math.random() * 100);

      try {
        const cardResult = await generateKinkyCard(
          turn,
          totalTurns,
          setup,
          history,
          randomSalt,
        );
        const difficulty = calculateDifficulty(cardResult);

        setCurrentCard({
          text: cardResult,
          difficulty,
          actionTaken: null,
        });

        setHistory((prev) =>
          [{ text: cardResult, difficulty }, ...prev].slice(0, 10),
        );

        const cardDuration = extractSeconds(cardResult, turn === totalTurns) || 0;
        setRegenSeed(0);
        return { nextTurn: turn + 1, duration: cardDuration };
      } catch (err) {
        console.error("Engine Error:", err);
        return { nextTurn: turn + 1, duration: 0 };
      } finally {
        setLoading(false);
      }
    },
    [setup, totalTurns, history],
  );

  const handleRegenerate = useCallback(
    async (currentTurn) => {
      setLoading(true);
      const nextSeed = regenSeed + 1;

      try {
        const newCard = await generateKinkyCard(
          currentTurn,
          totalTurns,
          setup,
          history.slice(1).map((h) => (typeof h === "string" ? h : h.text)),
          nextSeed,
        );

        const difficulty = calculateDifficulty(newCard);
        setCurrentCard({ text: newCard, difficulty, actionTaken: null });
        setHistory((prev) => [{ text: newCard, difficulty }, ...prev.slice(1)]);
        setRegenSeed(nextSeed);

        const cardDuration =
          extractSeconds(newCard, currentTurn === totalTurns) || 0;
        return cardDuration;
      } catch (err) {
        console.error("Regen Error");
        return 0;
      } finally {
        setLoading(false);
      }
    },
    [setup, totalTurns, history, regenSeed],
  );

  const handleDoIt = useCallback(
    (duration, startTimer, onComplete) => {
      if (!duration) {
        setGameStats((prev) => ({
          ...prev,
          daresCompleted: prev.daresCompleted + 1,
        }));
        setCurrentCard((prev) => ({ ...prev, actionTaken: "done" }));
        return;
      }

      startTimer(duration, () => {
        setGameStats((s) => ({ ...s, daresCompleted: s.daresCompleted + 1 }));
        setCurrentCard((c) => ({ ...c, actionTaken: "done" }));
      });
    },
    [],
  );

  const handleDrink = useCallback(() => {
    const sips = currentCard.difficulty || 1;
    setGameStats((prev) => ({
      ...prev,
      drinksTaken: prev.drinksTaken + 1,
      totalSips: prev.totalSips + sips,
    }));
    setCurrentCard((prev) => ({ ...prev, actionTaken: "drank" }));
  }, [currentCard.difficulty]);

  const resetCardAction = useCallback(() => {
    setCurrentCard((prev) => ({ ...prev, actionTaken: null }));
  }, []);

  return {
    loading,
    currentCard,
    history,
    gameStats,
    handleNextTurn,
    handleRegenerate,
    handleDoIt,
    handleDrink,
    resetCardAction,
    extractSeconds,
  };
};
